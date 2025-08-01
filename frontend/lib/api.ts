// API utility for making requests to the backend
const getApiBaseUrl = () => {
  // In production, use the Railway backend URL
  // In development, use localhost
  if (typeof window !== 'undefined') {
    // Client-side: use relative URLs (Next.js rewrites will handle this)
    return '/api';
  } else {
    // Server-side: use absolute URLs
    return process.env.NODE_ENV === 'production'
      ? 'https://culturesense-production.up.railway.app/api'
      : 'http://localhost:3001/api';
  }
};

export const apiBaseUrl = getApiBaseUrl();

// Helper function for making API requests
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${apiBaseUrl}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Specific API functions
export const crossDomainAnalysis = async (data: any) => {
  return apiRequest('/cross-domain-analysis', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const brandCultureAlignment = async (data: any) => {
  return apiRequest('/brand-culture-alignment', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const culturalMarketIntelligence = async (data: any) => {
  return apiRequest('/cultural-market-intelligence', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const culturalPersona = async (data: any) => {
  return apiRequest('/cultural-persona', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const culturalStrategist = async (data: any) => {
  return apiRequest('/cultural-strategist', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}; 