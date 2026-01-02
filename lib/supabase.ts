import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create Supabase client (only if credentials are provided)
export const supabase: SupabaseClient | null = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Check if Supabase is configured
export const isSupabaseConfigured = !!supabase;

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
  if (!supabase) {
    console.warn('Supabase not configured, skipping lead save');
    return null;
  }

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
  if (!supabase) {
    console.warn('Supabase not configured, skipping measurement save');
    return null;
  }

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
  if (!supabase) {
    console.warn('Supabase not configured, cannot fetch leads');
    return [];
  }

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
