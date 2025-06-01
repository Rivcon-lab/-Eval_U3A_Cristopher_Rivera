import axios from 'axios';
import { config } from '../config';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

const api = axios.create({
  baseURL: `${CORS_PROXY}${config.apiBaseUrl}`,
  headers: {
    'Authorization': `Bearer ${config.apiToken}`,
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // Required by CORS proxy
  },
});

export const apiService = {
  // Productos y Servicios
  getProducts: async () => {
    try {
      console.log('Making API request to:', `${CORS_PROXY}${config.apiBaseUrl}/products-services/`);
      const response = await api.get('/products-services/');
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
        });
      }
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await api.get('/products-services/');
      const product = response.data.data.productos.find(p => p.id.toString() === id);
      return product || null;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      return null;
    }
  },

  // Sobre Nosotros
  getAboutUs: async () => {
    try {
      const response = await api.get('/about-us/');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching about us:', error);
      throw error;
    }
  },

  // FAQ
  getFaqs: async () => {
    try {
      const response = await api.get('/faq/');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      throw error;
    }
  },

  getFaqsByCategory: async (category) => {
    try {
      const response = await api.get(`/faq/?category=${category}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching FAQs for category ${category}:`, error);
      throw error;
    }
  },
};

export default apiService; 