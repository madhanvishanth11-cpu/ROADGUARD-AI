export interface LocationCoords {
  latitude: number;
  longitude: number;
  accuracy?: number; // in meters
}

export const getCurrentLocation = (): Promise<LocationCoords> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
};

/**
 * Reverse geocodes coordinates to a readable address using OpenStreetMap Nominatim.
 */
export const reverseGeocode = async (lat: number, lon: number): Promise<string | null> => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`, {
      headers: {
        'Accept-Language': 'en',
        // Good practice to provide a user agent for Nominatim to avoid rate limits
        'User-Agent': 'RoadGuardAI-Prototype' 
      }
    });
    
    if (!response.ok) return null;
    
    const data = await response.json();
    
    if (data && data.address) {
      const road = data.address.road || data.address.neighbourhood || '';
      const city = data.address.city || data.address.town || data.address.village || '';
      if (road && city) return `${road}, ${city}`;
      if (road) return road;
      if (city) return city;
      return data.display_name;
    }
    
    return null;
  } catch (error) {
    console.warn("Reverse geocoding failed:", error);
    return null;
  }
};

/**
 * Calculates the distance in meters between two coordinates using the Haversine formula.
 */
export const getDistanceInMeters = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371e3; // Earth radius in meters
  const toRadians = (degrees: number) => degrees * Math.PI / 180;
  
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
            
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
};
