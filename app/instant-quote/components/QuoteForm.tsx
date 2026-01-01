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

  // Separate form fields
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('ME');
  const [zipCode, setZipCode] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const [errors, setErrors] = useState<
    Partial<Record<'streetAddress' | 'city' | 'state' | 'zip' | 'email' | 'roofTypes' | 'phone' | 'firstName' | 'lastName', string>>
  >({});
  const [touched, setTouched] = useState<
    Partial<Record<'streetAddress' | 'city' | 'state' | 'zip' | 'email' | 'roofTypes' | 'phone' | 'firstName' | 'lastName', boolean>>
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

  const validate = (): boolean => {
    const newErrors: Partial<
      Record<'streetAddress' | 'city' | 'state' | 'zip' | 'email' | 'roofTypes' | 'phone' | 'firstName' | 'lastName', string>
    > = {};

    // Street address validation
    if (!streetAddress.trim()) {
      newErrors.streetAddress = 'Street address is required';
    } else if (streetAddress.trim().length < 5) {
      newErrors.streetAddress = 'Please enter a complete street address';
    }

    // City validation
    if (!city.trim()) {
      newErrors.city = 'City is required';
    } else if (city.trim().length < 2) {
      newErrors.city = 'Please enter a valid city name';
    }

    // State validation
    if (!state.trim()) {
      newErrors.state = 'State is required';
    }

    // ZIP validation
    const zipDigits = zipCode.replace(/\D/g, '');
    if (zipDigits.length !== 5) {
      newErrors.zip = 'ZIP code must be 5 digits';
    }

    // Email validation
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Roof types validation
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
      touched[field as 'email' | 'roofTypes' | 'phone'] &&
      errors[field as 'email' | 'roofTypes' | 'phone']
    ) {
      setErrors((prev) => ({
        ...prev,
        [field as 'email' | 'roofTypes' | 'phone']: undefined,
      }));
    }
  };

  const handleStreetAddressChange = (value: string) => {
    setStreetAddress(value);
    if (touched.streetAddress && errors.streetAddress) {
      setErrors((prev) => ({ ...prev, streetAddress: undefined }));
    }
  };

  const handleCityChange = (value: string) => {
    setCity(value);
    if (touched.city && errors.city) {
      setErrors((prev) => ({ ...prev, city: undefined }));
    }
  };

  const handleStateChange = (value: string) => {
    setState(value);
    if (touched.state && errors.state) {
      setErrors((prev) => ({ ...prev, state: undefined }));
    }
  };

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
    if (touched.firstName && errors.firstName) {
      setErrors((prev) => ({ ...prev, firstName: undefined }));
    }
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
    if (touched.lastName && errors.lastName) {
      setErrors((prev) => ({ ...prev, lastName: undefined }));
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

  const handleBlur = (field: 'streetAddress' | 'city' | 'state' | 'zip' | 'email' | 'roofTypes' | 'phone' | 'firstName' | 'lastName') => {
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
      streetAddress: true,
      city: true,
      state: true,
      zip: true,
      email: true,
      roofTypes: true,
      phone: true,
      firstName: true,
      lastName: true,
    });

    if (!validate()) {
      return;
    }

    // Build address string from separate fields: "Street Address, City, State ZIP"
    const zipDigits = zipCode.replace(/\D/g, '');
    const normalizedAddress = `${streetAddress.trim()}, ${city.trim()}, ${state.trim()} ${zipDigits}`;

    // Build name from first + last name
    const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(' ');

    // Build clean request payload: normalize phone (strip non-digits, only include if 10+ digits)
    const phoneDigits = formData.phone ? formData.phone.replace(/\D/g, '') : '';
    const normalizedPhone = phoneDigits.length >= 10 ? phoneDigits : undefined;

    const requestPayload: QuoteRequest = {
      // Full address string (required)
      address: normalizedAddress,
      // Separate address components
      streetAddress: streetAddress.trim(),
      city: city.trim(),
      state: state.trim(),
      zip: zipDigits,
      // Name fields
      ...(fullName ? { name: fullName } : {}),
      ...(firstName.trim() ? { firstName: firstName.trim() } : {}),
      ...(lastName.trim() ? { lastName: lastName.trim() } : {}),
      // Contact fields
      email: formData.email?.trim() || '',
      ...(normalizedPhone ? { phone: normalizedPhone } : {}),
      // Roof types
      roofTypes: formData.roofTypes || [],
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
          {/* Street Address */}
          <div className="space-y-2">
            <Label htmlFor="streetAddress">
              Street Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="streetAddress"
              type="text"
              placeholder="123 Main St"
              value={streetAddress}
              onChange={(e) => handleStreetAddressChange(e.target.value)}
              onBlur={() => handleBlur('streetAddress')}
              disabled={isLoading}
              className={errors.streetAddress ? 'border-destructive' : ''}
            />
            {touched.streetAddress && errors.streetAddress && (
              <p className="text-sm text-destructive">{errors.streetAddress}</p>
            )}
          </div>

          {/* City, State, ZIP Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* City */}
            <div className="space-y-2">
              <Label htmlFor="city">
                City <span className="text-destructive">*</span>
              </Label>
              <Input
                id="city"
                type="text"
                placeholder="Portland"
                value={city}
                onChange={(e) => handleCityChange(e.target.value)}
                onBlur={() => handleBlur('city')}
                disabled={isLoading}
                className={errors.city ? 'border-destructive' : ''}
              />
              {touched.city && errors.city && (
                <p className="text-sm text-destructive">{errors.city}</p>
              )}
            </div>

            {/* State */}
            <div className="space-y-2">
              <Label htmlFor="state">
                State <span className="text-destructive">*</span>
              </Label>
              <Input
                id="state"
                type="text"
                placeholder="ME"
                value={state}
                onChange={(e) => handleStateChange(e.target.value.toUpperCase())}
                onBlur={() => handleBlur('state')}
                disabled={isLoading}
                maxLength={2}
                className={errors.state ? 'border-destructive' : ''}
              />
              {touched.state && errors.state && (
                <p className="text-sm text-destructive">{errors.state}</p>
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
            </div>
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

          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name (optional)</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => handleFirstNameChange(e.target.value)}
                onBlur={() => handleBlur('firstName')}
                disabled={isLoading}
                className={errors.firstName ? 'border-destructive' : ''}
              />
              {touched.firstName && errors.firstName && (
                <p className="text-sm text-destructive">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name (optional)</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => handleLastNameChange(e.target.value)}
                onBlur={() => handleBlur('lastName')}
                disabled={isLoading}
                className={errors.lastName ? 'border-destructive' : ''}
              />
              {touched.lastName && errors.lastName && (
                <p className="text-sm text-destructive">{errors.lastName}</p>
              )}
            </div>
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
