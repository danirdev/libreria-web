const API_URL = 'http://localhost:3000/api';

// Función auxiliar para obtener headers con token
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }), // Agrega el token si existe
  };
};

export const api = {
  get: async <T>(endpoint: string): Promise<T> => {
    const res = await fetch(`${API_URL}${endpoint}`);
    if (!res.ok) throw new Error(`Error en GET ${endpoint}`);
    return res.json();
  },

  post: async <T>(endpoint: string, data: any): Promise<T> => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(), // <--- Usamos getHeaders
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Error en POST ${endpoint}`);
    return res.json();
  },

  put: async <T>(endpoint: string, data: any): Promise<T> => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(), // <--- Usamos getHeaders
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Error en PUT ${endpoint}`);
    return res.json();
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(), // <--- Usamos getHeaders
    });
    if (!res.ok) throw new Error(`Error en DELETE ${endpoint}`);
    return res.json();
  },
};
