import { NextRequest, NextResponse } from 'next/server';
import { saveLead, type Lead } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Create lead object
    const lead: Lead = {
      address: body.address,
      normalized_address: body.normalizedAddress,
      name: body.name,
      first_name: body.firstName,
      last_name: body.lastName,
      email: body.email,
      phone: body.phone,
      roof_types: body.roofTypes,
      estimated_squares: body.estimatedSquares,
      measurement_method: body.measurementMethod,
      coordinates: body.coordinates,
      pricing: body.pricing,
      metadata: body.metadata,
      status: 'new',
    };

    // Save to Supabase
    const savedLead = await saveLead(lead);

    // Send email notifications (in parallel)
    await Promise.allSettled([
      sendHomeownerEmail(lead),
      sendTeamNotification(lead),
    ]);

    return NextResponse.json({
      success: true,
      leadId: savedLead.id,
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save lead',
      },
      { status: 500 }
    );
  }
}

/**
 * Send email to homeowner with their quote results
 */
async function sendHomeownerEmail(lead: Lead) {
  if (!lead.email) return;

  try {
    // TODO: Integrate with your email service (SendGrid, Resend, etc.)
    // For now, just log
    console.log('Would send homeowner email to:', lead.email);
    console.log('Quote details:', {
      address: lead.address,
      estimatedSquares: lead.estimated_squares,
      pricing: lead.pricing,
    });

    // Example email content:
    // Subject: Your GraniteShield Roofing Quote for [address]
    // Body: Thank you for your interest! Here's your instant quote...
    // Include: estimated squares, pricing ranges, next steps, contact info
  } catch (error) {
    console.error('Error sending homeowner email:', error);
  }
}

/**
 * Send notification to team about new lead
 */
async function sendTeamNotification(lead: Lead) {
  try {
    // TODO: Integrate with your email service
    // For now, just log
    console.log('New lead notification:', {
      name: lead.name || `${lead.first_name} ${lead.last_name}`,
      email: lead.email,
      phone: lead.phone,
      address: lead.address,
      estimatedSquares: lead.estimated_squares,
      roofTypes: lead.roof_types,
    });

    // Example email content:
    // To: team@graniteshieldroofing.com
    // Subject: New Instant Quote Lead - [address]
    // Body: New lead details with all contact info and quote data
  } catch (error) {
    console.error('Error sending team notification:', error);
  }
}
