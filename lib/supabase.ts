import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Lead {
  id?: string;
  created_at?: string;
  address: string;
  normalized_address?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  roof_types?: string[];
  estimated_squares?: number;
  measurement_method?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  pricing?: any;
  metadata?: any;
  status?: 'new' | 'contacted' | 'quoted' | 'won' | 'lost';
}

export interface Measurement {
  id?: string;
  created_at?: string;
  address: string;
  normalized_address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  total_roof_area: number;
  estimated_squares: number;
  measurement_method: string;
  planes?: any[];
  metadata?: any;
}

/**
 * Save a lead to Supabase
 */
export async function saveLead(lead: Lead) {
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([lead])
      .select()
      .single();

    if (error) {
      console.error('Error saving lead:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to save lead:', error);
    throw error;
  }
}

/**
 * Save a measurement to Supabase
 */
export async function saveMeasurement(measurement: Measurement) {
  try {
    const { data, error } = await supabase
      .from('measurements')
      .insert([measurement])
      .select()
      .single();

    if (error) {
      console.error('Error saving measurement:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to save measurement:', error);
    throw error;
  }
}

/**
 * Get all leads (for admin dashboard)
 */
export async function getLeads(limit = 100) {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch leads:', error);
    throw error;
  }
}
