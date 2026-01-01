'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent } from '@/components/ui/card';

interface QuoteMapPreviewProps {
  latitude: number;
  longitude: number;
  parcelBounds?: {
    minLat: number;
    minLng: number;
    maxLat: number;
    maxLng: number;
  };
}

export function QuoteMapPreview({
  latitude,
  longitude,
  parcelBounds,
}: QuoteMapPreviewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    // Guard: must run on client side only
    if (typeof window === 'undefined') return;

    // Guard: must have token
    if (!MAPBOX_TOKEN) {
      setError('Map preview unavailable (missing Mapbox token)');
      setIsLoading(false);
      return;
    }

    // Guard: must have valid coordinates
    if (
      typeof latitude !== 'number' ||
      typeof longitude !== 'number' ||
      isNaN(latitude) ||
      isNaN(longitude)
    ) {
      setError('Map preview unavailable (invalid coordinates)');
      setIsLoading(false);
      return;
    }

    // Guard: must have container
    if (!mapContainer.current) return;

    // Set Mapbox access token
    mapboxgl.accessToken = MAPBOX_TOKEN;

    // Initialize map
    try {
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [longitude, latitude],
        zoom: parcelBounds ? 16 : 17.5,
        attributionControl: false,
      });

      // Add navigation controls
      mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // If parcel bounds are available, fit map to bounds
      if (parcelBounds) {
        mapInstance.on('load', () => {
          const bounds = new mapboxgl.LngLatBounds(
            [parcelBounds.minLng, parcelBounds.minLat],
            [parcelBounds.maxLng, parcelBounds.maxLat]
          );

          mapInstance.fitBounds(bounds, {
            padding: { top: 50, bottom: 50, left: 50, right: 50 },
            maxZoom: 18,
          });

          // Add parcel outline if bounds are available
          if (mapInstance.getSource('parcel')) {
            (mapInstance.getSource('parcel') as mapboxgl.GeoJSONSource).setData({
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [parcelBounds.minLng, parcelBounds.minLat],
                    [parcelBounds.maxLng, parcelBounds.minLat],
                    [parcelBounds.maxLng, parcelBounds.maxLat],
                    [parcelBounds.minLng, parcelBounds.maxLat],
                    [parcelBounds.minLng, parcelBounds.minLat],
                  ],
                ],
              },
              properties: {},
            });
          } else {
            mapInstance.addSource('parcel', {
              type: 'geojson',
              data: {
                type: 'Feature',
                geometry: {
                  type: 'Polygon',
                  coordinates: [
                    [
                      [parcelBounds.minLng, parcelBounds.minLat],
                      [parcelBounds.maxLng, parcelBounds.minLat],
                      [parcelBounds.maxLng, parcelBounds.maxLat],
                      [parcelBounds.minLng, parcelBounds.maxLat],
                      [parcelBounds.minLng, parcelBounds.minLat],
                    ],
                  ],
                },
                properties: {},
              },
            });

            // Add fill layer for parcel
            mapInstance.addLayer({
              id: 'parcel-fill',
              type: 'fill',
              source: 'parcel',
              paint: {
                'fill-color': '#3b82f6',
                'fill-opacity': 0.2,
              },
            });

            // Add outline layer for parcel
            mapInstance.addLayer({
              id: 'parcel-outline',
              type: 'line',
              source: 'parcel',
              paint: {
                'line-color': '#3b82f6',
                'line-width': 2,
                'line-opacity': 0.8,
              },
            });
          }
        });
      }

      // Add marker at property location
      new mapboxgl.Marker({ color: '#ef4444' })
        .setLngLat([longitude, latitude])
        .addTo(mapInstance);

      mapInstance.on('load', () => {
        setIsLoading(false);
      });

      mapInstance.on('error', (e) => {
        console.error('Mapbox error:', e);
        setError('Map failed to load');
        setIsLoading(false);
      });

      map.current = mapInstance;

      // Cleanup function
      return () => {
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      };
    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Map preview unavailable');
      setIsLoading(false);
    }
  }, [latitude, longitude, parcelBounds, MAPBOX_TOKEN]);

  // Render fallback messages
  if (error) {
    return (
      <Card className="border-slate-200">
        <CardContent className="p-8 text-center">
          <p className="text-sm text-slate-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="border-slate-200">
        <CardContent className="p-8 text-center">
          <p className="text-sm text-slate-600">Loading map preview...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200 overflow-hidden">
      <CardContent className="p-0">
        <div
          ref={mapContainer}
          className="w-full h-[320px] rounded-lg"
          style={{ minHeight: '320px' }}
        />
      </CardContent>
    </Card>
  );
}

