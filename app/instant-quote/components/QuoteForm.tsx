'use client';

import { useState, FormEvent } from 'react';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { QuoteRequest } from '@/lib/api/quote';
import { RoofTypeOption } from '../types';

interface QuoteFormProps {
  onSubmit: (request: QuoteRequest) => Promise<void>;
  isLoading: boolean;
  error?: string | null;
}

const ROOF_TYPE_OPTIONS: Array<{
  id: RoofTypeOption;
  label: string;
}> = [
  { id: 'asphalt', label: 'Asphalt Shingles' },
  { id: 'standing_seam_roof_over', label: 'Standing Seam Metal (Roof-over)' },
  { id: 'standing_seam_tear_off', label: 'Standing Seam Metal (Full Tear-off)' },
];

const DEFAULT_ROOF_TYPES: RoofTypeOption[] = [
  'asphalt',
  'standing_seam_roof_over',
  'standing_seam_tear_off',
];

export function QuoteForm({ onSubmit, isLoading, error }: QuoteFormProps) {
  const [formData, setFormData] = useState<QuoteRequest>({
    address: '',
    email: '',
    phone: '',
    name: '',
    roofTypes: [...DEFAULT_ROOF_TYPES],
  });

  const [zipCode, setZipCode] = useState<string>('');

  const [errors, setErrors] = useState<
    Partial<Record<'address' | 'email' | 'roofTypes' | 'phone' | 'zip', string>>
  >({});
  const [touched, setTouched] = useState<
    Partial<Record<'address' | 'email' | 'roofTypes' | 'phone' | 'zip', boolean>>
  >({});

  const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Extract ZIP code from address string (5 digits)
  const extractZipFromAddress = (address: string): string | null => {
    const zipMatch = address.match(/\b\d{5}\b/);
    return zipMatch ? zipMatch[0] : null;
  };

  // Check if address contains ", ME" (case insensitive)
  const hasMaineState = (address: string): boolean => {
    return /,\s*ME\b/i.test(address);
  };

  const validate = (): boolean => {
    const newErrors: Partial<
      Record<'address' | 'email' | 'roofTypes' | 'phone' | 'zip', string>
    > = {};

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.trim().length < 8) {
      newErrors.address = 'Please enter a complete address (at least 8 characters)';
    }

    // ZIP validation: must have ZIP either in address string or in ZIP field
    const zipInAddress = extractZipFromAddress(formData.address);
    const zipDigits = zipCode.replace(/\D/g, '');
    const hasZip = zipInAddress || (zipDigits.length === 5);

    if (!hasZip) {
      newErrors.zip = 'Please include ZIP so we can match the correct property in Maine.';
    } else if (zipDigits.length > 0 && zipDigits.length !== 5) {
      newErrors.zip = 'ZIP code must be 5 digits';
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.roofTypes || formData.roofTypes.length === 0) {
      newErrors.roofTypes = 'Select at least one roof type.';
    }

    // Phone validation: if provided, must have at least 10 digits
    if (formData.phone) {
      const digitsOnly = formData.phone.replace(/\D/g, '');
      if (digitsOnly.length > 0 && digitsOnly.length < 10) {
        newErrors.phone = 'If you enter a phone number, please include at least 10 digits.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof QuoteRequest, value: string | RoofTypeOption[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (
      touched[field as 'address' | 'email' | 'roofTypes' | 'phone'] &&
      errors[field as 'address' | 'email' | 'roofTypes' | 'phone']
    ) {
      setErrors((prev) => ({
        ...prev,
        [field as 'address' | 'email' | 'roofTypes' | 'phone']: undefined,
      }));
    }
  };

  const handleZipChange = (value: string) => {
    // Only allow digits, max 5
    const digits = value.replace(/\D/g, '').slice(0, 5);
    setZipCode(digits);
    if (touched.zip && errors.zip) {
      setErrors((prev) => ({ ...prev, zip: undefined }));
    }
  };

  const handleBlur = (field: 'address' | 'email' | 'roofTypes' | 'phone' | 'zip') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    handleChange('phone', formatted);
  };

  const handleRoofTypeToggle = (roofType: RoofTypeOption) => {
    const currentTypes = formData.roofTypes || [];
    const newTypes = currentTypes.includes(roofType)
      ? currentTypes.filter((type) => type !== roofType)
      : [...currentTypes, roofType];
    handleChange('roofTypes', newTypes);
    if (touched.roofTypes && errors.roofTypes) {
      setErrors((prev) => ({ ...prev, roofTypes: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({
      address: true,
      email: true,
      roofTypes: true,
      phone: true,
      zip: true,
    });

    if (!validate()) {
      return;
    }

    // Normalize address: append ", ME" if not present, append ZIP if provided and not in address
    let normalizedAddress = formData.address.trim();
    const zipDigits = zipCode.replace(/\D/g, '');
    
    // Check if ZIP is already in the original address string
    const zipInOriginalAddress = extractZipFromAddress(normalizedAddress);
    
    // Check if ", ME" is already in address (case insensitive)
    const hasState = hasMaineState(normalizedAddress);
    
    // If ZIP is not in address and ZIP field has value, add it
    if (!zipInOriginalAddress && zipDigits.length === 5) {
      // Insert ZIP before ", ME" if state is present, otherwise append to end
      if (hasState) {
        // Find where ", ME" starts and insert ZIP before it
        const stateIndex = normalizedAddress.search(/,\s*ME\b/i);
        normalizedAddress = `${normalizedAddress.slice(0, stateIndex).trim()} ${zipDigits}${normalizedAddress.slice(stateIndex)}`;
      } else {
        // Append ZIP, then we'll add ", ME" next
        normalizedAddress = `${normalizedAddress} ${zipDigits}`;
      }
    }
    
    // Append ", ME" if not present (after ZIP has been handled)
    if (!hasMaineState(normalizedAddress)) {
      normalizedAddress = `${normalizedAddress}, ME`;
    }

    // Build clean request payload: normalize phone (strip non-digits, only include if 10+ digits)
    const phoneDigits = formData.phone ? formData.phone.replace(/\D/g, '') : '';
    const normalizedPhone = phoneDigits.length >= 10 ? phoneDigits : undefined;

    const requestPayload: QuoteRequest = {
      address: normalizedAddress,
      email: formData.email?.trim() || '',
      roofTypes: formData.roofTypes || [],
      ...(normalizedPhone ? { phone: normalizedPhone } : {}),
      ...(formData.name?.trim() ? { name: formData.name.trim() } : {}),
    };

    await onSubmit(requestPayload);
  };

  return (
    <Card className="shadow-xl border-slate-200">
      <CardContent className="p-6 sm:p-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">
              Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="address"
              type="text"
              placeholder="123 Main St, Portland"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              onBlur={() => handleBlur('address')}
              disabled={isLoading}
              className={errors.address ? 'border-destructive' : ''}
            />
            {touched.address && errors.address && (
              <p className="text-sm text-destructive">{errors.address}</p>
            )}
          </div>

          {/* ZIP Code */}
          <div className="space-y-2">
            <Label htmlFor="zip">
              ZIP Code <span className="text-destructive">*</span>
            </Label>
            <Input
              id="zip"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="04101"
              value={zipCode}
              onChange={(e) => handleZipChange(e.target.value)}
              onBlur={() => handleBlur('zip')}
              disabled={isLoading}
              maxLength={5}
              className={errors.zip ? 'border-destructive' : ''}
            />
            {touched.zip && errors.zip && (
              <p className="text-sm text-destructive">{errors.zip}</p>
            )}
            <p className="text-xs text-slate-500">
              We&apos;ll automatically add Maine to your address
            </p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              disabled={isLoading}
              className={errors.email ? 'border-destructive' : ''}
            />
            {touched.email && errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(207) 555-1234"
              value={formData.phone || ''}
              onChange={(e) => handlePhoneChange(e.target.value)}
              onBlur={() => handleBlur('phone')}
              disabled={isLoading}
              maxLength={14}
              className={errors.phone ? 'border-destructive' : ''}
            />
            {touched.phone && errors.phone && (
              <p className="text-sm text-destructive">{errors.phone}</p>
            )}
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name (optional)</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Roof Types */}
          <div className="space-y-3">
            <Label>
              Roof Types <span className="text-destructive">*</span>
            </Label>
            <div className="space-y-3">
              {ROOF_TYPE_OPTIONS.map((option) => (
                <div key={option.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={option.id}
                    checked={(formData.roofTypes || []).includes(option.id)}
                    onCheckedChange={() => handleRoofTypeToggle(option.id)}
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor={option.id}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
            {touched.roofTypes && errors.roofTypes && (
              <p className="text-sm text-destructive">{errors.roofTypes}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="cta"
            size="lg"
            className="w-full h-12"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Calculating Your Estimate…
              </>
            ) : (
              'Get My Instant Estimate'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
