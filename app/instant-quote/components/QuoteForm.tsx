'use client';

import { useState, FormEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { QuoteRequest } from '@/lib/api/quote';
import { RoofTypeOption } from '../types';

interface QuoteFormProps {
  onSubmit: (request: QuoteRequest) => Promise<void>;
  isLoading: boolean;
  error?: string | null;
}

// Default to standing seam options (focus on metal roofing)
const DEFAULT_ROOF_TYPES: RoofTypeOption[] = [
  'standing_seam_roof_over',
  'standing_seam_tear_off',
];

export function QuoteForm({ onSubmit, isLoading, error }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    streetAddress: '',
    city: '',
    state: 'ME',
    zipCode: '',
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
  });

  const [focused, setFocused] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    const newErrors: Record<string, string> = {};

    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = 'Street address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    const zipDigits = formData.zipCode.replace(/\D/g, '');
    if (zipDigits.length !== 5) {
      newErrors.zipCode = 'ZIP code must be 5 digits';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    handleChange('phone', formatted);
  };

  const handleZipChange = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 5);
    handleChange('zipCode', digits);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const zipDigits = formData.zipCode.replace(/\D/g, '');
    const normalizedAddress = `${formData.streetAddress.trim()}, ${formData.city.trim()}, ${formData.state.trim()} ${zipDigits}`;
    const fullName = [formData.firstName.trim(), formData.lastName.trim()].filter(Boolean).join(' ');
    const phoneDigits = formData.phone.replace(/\D/g, '');
    const normalizedPhone = phoneDigits.length >= 10 ? phoneDigits : undefined;

    const requestPayload: QuoteRequest = {
      address: normalizedAddress,
      streetAddress: formData.streetAddress.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      zip: zipDigits,
      ...(fullName ? { name: fullName } : {}),
      ...(formData.firstName.trim() ? { firstName: formData.firstName.trim() } : {}),
      ...(formData.lastName.trim() ? { lastName: formData.lastName.trim() } : {}),
      email: formData.email.trim(),
      ...(normalizedPhone ? { phone: normalizedPhone } : {}),
      roofTypes: [...DEFAULT_ROOF_TYPES],
    };

    await onSubmit(requestPayload);
  };

  // Helper to check if field has value or is focused
  const isActive = (field: string) => {
    return focused[field] || formData[field as keyof typeof formData];
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Unable to Generate Quote</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Street Address */}
        <div className="relative">
          <input
            id="streetAddress"
            name="street-address"
            type="text"
            autoComplete="street-address"
            value={formData.streetAddress}
            onChange={(e) => handleChange('streetAddress', e.target.value)}
            onFocus={() => setFocused((prev) => ({ ...prev, streetAddress: true }))}
            onBlur={() => setFocused((prev) => ({ ...prev, streetAddress: false }))}
            disabled={isLoading}
            className={`peer w-full px-4 pt-6 pb-2 text-base border rounded-lg transition-all duration-200 outline-none ${
              errors.streetAddress
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
            } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
          />
          <label
            htmlFor="streetAddress"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              isActive('streetAddress')
                ? 'top-2 text-xs text-gray-500'
                : 'top-4 text-base text-gray-400'
            }`}
          >
            Street Address
          </label>
          {errors.streetAddress && (
            <p className="mt-1 text-xs text-red-500">{errors.streetAddress}</p>
          )}
        </div>

        {/* City */}
        <div className="relative">
          <input
            id="city"
            name="address-level2"
            type="text"
            autoComplete="address-level2"
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            onFocus={() => setFocused((prev) => ({ ...prev, city: true }))}
            onBlur={() => setFocused((prev) => ({ ...prev, city: false }))}
            disabled={isLoading}
            className={`peer w-full px-4 pt-6 pb-2 text-base border rounded-lg transition-all duration-200 outline-none ${
              errors.city
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
            } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
          />
          <label
            htmlFor="city"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              isActive('city')
                ? 'top-2 text-xs text-gray-500'
                : 'top-4 text-base text-gray-400'
            }`}
          >
            City
          </label>
          {errors.city && (
            <p className="mt-1 text-xs text-red-500">{errors.city}</p>
          )}
        </div>

        {/* State and ZIP */}
        <div className="grid grid-cols-2 gap-4">
          {/* State */}
          <div className="relative">
            <input
              id="state"
              name="address-level1"
              type="text"
              autoComplete="address-level1"
              value={formData.state}
              onChange={(e) => handleChange('state', e.target.value.toUpperCase())}
              onFocus={() => setFocused((prev) => ({ ...prev, state: true }))}
              onBlur={() => setFocused((prev) => ({ ...prev, state: false }))}
              disabled={isLoading}
              maxLength={2}
              className={`peer w-full px-4 pt-6 pb-2 text-base border rounded-lg transition-all duration-200 outline-none ${
                errors.state
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
            />
            <label
              htmlFor="state"
              className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                isActive('state')
                  ? 'top-2 text-xs text-gray-500'
                  : 'top-4 text-base text-gray-400'
              }`}
            >
              State
            </label>
            {errors.state && (
              <p className="mt-1 text-xs text-red-500">{errors.state}</p>
            )}
          </div>

          {/* ZIP Code */}
          <div className="relative">
            <input
              id="zipCode"
              name="postal-code"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              value={formData.zipCode}
              onChange={(e) => handleZipChange(e.target.value)}
              onFocus={() => setFocused((prev) => ({ ...prev, zipCode: true }))}
              onBlur={() => setFocused((prev) => ({ ...prev, zipCode: false }))}
              disabled={isLoading}
              className={`peer w-full px-4 pt-6 pb-2 text-base border rounded-lg transition-all duration-200 outline-none ${
                errors.zipCode
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
            />
            <label
              htmlFor="zipCode"
              className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                isActive('zipCode')
                  ? 'top-2 text-xs text-gray-500'
                  : 'top-4 text-base text-gray-400'
              }`}
            >
              ZIP Code
            </label>
            {errors.zipCode && (
              <p className="mt-1 text-xs text-red-500">{errors.zipCode}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onFocus={() => setFocused((prev) => ({ ...prev, email: true }))}
            onBlur={() => setFocused((prev) => ({ ...prev, email: false }))}
            disabled={isLoading}
            className={`peer w-full px-4 pt-6 pb-2 text-base border rounded-lg transition-all duration-200 outline-none ${
              errors.email
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
            } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
          />
          <label
            htmlFor="email"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              isActive('email')
                ? 'top-2 text-xs text-gray-500'
                : 'top-4 text-base text-gray-400'
            }`}
          >
            Email
          </label>
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone (optional) */}
        <div className="relative">
          <input
            id="phone"
            name="tel"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            onFocus={() => setFocused((prev) => ({ ...prev, phone: true }))}
            onBlur={() => setFocused((prev) => ({ ...prev, phone: false }))}
            disabled={isLoading}
            className={`peer w-full px-4 pt-6 pb-2 text-base border rounded-lg transition-all duration-200 outline-none border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
              isLoading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
            }`}
          />
          <label
            htmlFor="phone"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              isActive('phone')
                ? 'top-2 text-xs text-gray-500'
                : 'top-4 text-base text-gray-400'
            }`}
          >
            Phone (optional)
          </label>
        </div>

        {/* First Name (optional) */}
        <div className="relative">
          <input
            id="firstName"
            name="given-name"
            type="text"
            autoComplete="given-name"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            onFocus={() => setFocused((prev) => ({ ...prev, firstName: true }))}
            onBlur={() => setFocused((prev) => ({ ...prev, firstName: false }))}
            disabled={isLoading}
            className={`peer w-full px-4 pt-6 pb-2 text-base border rounded-lg transition-all duration-200 outline-none border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
              isLoading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
            }`}
          />
          <label
            htmlFor="firstName"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              isActive('firstName')
                ? 'top-2 text-xs text-gray-500'
                : 'top-4 text-base text-gray-400'
            }`}
          >
            First Name (optional)
          </label>
        </div>

        {/* Last Name (optional) */}
        <div className="relative">
          <input
            id="lastName"
            name="family-name"
            type="text"
            autoComplete="family-name"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            onFocus={() => setFocused((prev) => ({ ...prev, lastName: true }))}
            onBlur={() => setFocused((prev) => ({ ...prev, lastName: false }))}
            disabled={isLoading}
            className={`peer w-full px-4 pt-6 pb-2 text-base border rounded-lg transition-all duration-200 outline-none border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
              isLoading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
            }`}
          />
          <label
            htmlFor="lastName"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              isActive('lastName')
                ? 'top-2 text-xs text-gray-500'
                : 'top-4 text-base text-gray-400'
            }`}
          >
            Last Name (optional)
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full py-6 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Getting Your Estimate...
            </>
          ) : (
            'Get My Instant Estimate'
          )}
        </Button>
      </form>
    </div>
  );
}
