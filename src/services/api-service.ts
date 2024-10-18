import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

// Define types for Layout, Carousel, HistoryItem, and Directory
interface Route {
  _id?: string;
  name: string;
  path: string;
  icon: string;
  isCurrentlyUsed: boolean;
}

interface Layout {
  _id: string;
  name: string;
  routes: Route[];
  isCurrentlySet: boolean;
}

interface Image {
  _id?: string;
  url: string;
  isVisible: boolean;
}

interface Carousel {
  _id: string;
  name: string;
  images: Image[];
  isActive: boolean;
}

interface HistoryItem {
  _id?: string;
  title: string;
  yearsFrom: number;
  yearsUpto: number;
  image: string;
  description: string;
  index: number;
  isCurrentlyVisible: boolean;
}

interface DirectoryItem {
  _id?: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  website: string;
  image?: string;
  hours: string;
  iframe: string;
}

// Define the Form and other relevant interfaces
interface Form {
  _id?: string;
  title: string;
  description: string;
  fields: FormField[];
  isActive?: boolean;
}

interface FormField {
  label: string;
  type: string; // e.g., 'text', 'select', 'radio', etc.
  options?: string[]; // Only for select or radio button types
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://guideplusapi.cleartouchmedia.com/api', // Replace with your actual base URL
    });
  }

  // Layout API Methods
  getLayouts(): Promise<AxiosResponse<ApiResponse<Layout[]>>> {
    return this.axiosInstance.get('/layouts');
  }

  getLayoutById(id: string): Promise<AxiosResponse<ApiResponse<Layout>>> {
    return this.axiosInstance.get(`/layouts/${id}`);
  }

  createLayout(data: { name: string; routes: Partial<Route>[] }): Promise<AxiosResponse<ApiResponse<Layout>>> {
    return this.axiosInstance.post('/layouts', data);
  }

  updateLayout(id: string, data: { routes: Partial<Route>[] }): Promise<AxiosResponse<ApiResponse<Layout>>> {
    const routesWithoutId = data.routes.map(({ _id, ...rest }) => rest);
    return this.axiosInstance.put(`/layouts/${id}`, { routes: routesWithoutId });
  }

  deleteLayout(id: string): Promise<AxiosResponse<ApiResponse<Layout>>> {
    return this.axiosInstance.delete(`/layouts/${id}`);
  }

  //Form api methods

  // Carousel API Methods
  getCarousels(): Promise<any> {
    return this.axiosInstance.get('/carousels');
  }

  getCarouselById(id: string): Promise<AxiosResponse<any>> {
    return this.axiosInstance.get(`/carousels/${id}`);
  }

  createCarousel(data: { name: string; images: Image[] }): Promise<any> {
    return this.axiosInstance.post('/carousel', data);
  }

  updateCarousel(id: string, data: Partial<Carousel>): Promise<any> {
    return this.axiosInstance.put(`/carousels/${id}`, data);
  }

  deleteCarousel(id: string): Promise<any> {
    return this.axiosInstance.delete(`/carousels/${id}`);
  }

  addImageToCarousel(carouselId: string, data: Image): Promise<any> {
    return this.axiosInstance.post(`/carousels/${carouselId}/images`, data);
  }

  removeImageFromCarousel(carouselId: string, imageId: string): Promise<any> {
    return this.axiosInstance.delete(`/carousels/${carouselId}/images/${imageId}`);
  }

  // History API Methods
  getHistoryItems(): Promise<any> {
    return this.axiosInstance.get('/history');
  }

  getHistoryItemById(id: string): Promise<any> {
    return this.axiosInstance.get(`/history/${id}`);
  }

  createHistoryItem(data: HistoryItem): Promise<any> {
    return this.axiosInstance.post('/history', data);
  }

  updateHistoryItem(id: string, data: Partial<HistoryItem>): Promise<any> {
    return this.axiosInstance.put(`/history/${id}`, data);
  }

  deleteHistoryItem(id: string): Promise<any> {
    return this.axiosInstance.delete(`/history/${id}`);
  }

  updateHistoryOrder(items: Partial<HistoryItem>[]): Promise<AxiosResponse<ApiResponse<HistoryItem[]>>> {
    return this.axiosInstance.put('/history/order', { items });
  }

  // Directory API Methods
  getDirectoryItems(): Promise<AxiosResponse<ApiResponse<DirectoryItem[]>>> {
    return this.axiosInstance.get('/directories');
  }

  getDirectoryItemById(id: string): Promise<AxiosResponse<ApiResponse<DirectoryItem>>> {
    return this.axiosInstance.get(`/directories/${id}`);
  }

  createDirectoryItem(data: DirectoryItem): Promise<AxiosResponse<ApiResponse<DirectoryItem>>> {
    return this.axiosInstance.post('/directories', data);
  }

  updateDirectoryItem(id: string, data: Partial<DirectoryItem>): Promise<AxiosResponse<ApiResponse<DirectoryItem>>> {
    return this.axiosInstance.put(`/directories/${id}`, data);
  }

  deleteDirectoryItem(id: string): Promise<AxiosResponse<ApiResponse<DirectoryItem>>> {
    return this.axiosInstance.delete(`/directories/${id}`);
  }

  // Fetch all forms
  getForms(): Promise<AxiosResponse<ApiResponse<Form[]>>> {
    return this.axiosInstance.get('/forms');
  }

  // Fetch a form by ID
  getFormById(id: string): Promise<AxiosResponse<ApiResponse<Form>>> {
    return this.axiosInstance.get(`/forms/${id}`);
  }

  // Create a new form
  createForm(data: { title: string; description: string; fields: FormField[] }): Promise<any> {
    return this.axiosInstance.post('/forms', data);
  }

  // Update an existing form by ID
  updateForm(
    id: string,
    data: { title?: string; description?: string; fields?: FormField[] }
  ): Promise<AxiosResponse<ApiResponse<Form>>> {
    return this.axiosInstance.put(`/forms/${id}`, data);
  }

  // Delete a form by ID
  deleteForm(id: string): Promise<AxiosResponse<ApiResponse<Form>>> {
    return this.axiosInstance.delete(`/forms/${id}`);
  }

  // Fetch response count for a form by formId
  fetchCountByFormId(formId: string): Promise<AxiosResponse<ApiResponse<number>>> {
    return this.axiosInstance.get(`/forms/${formId}/responses/count`);
  }

  // Set a form as current
  setFormAsCurrent(formId: string): Promise<AxiosResponse<ApiResponse<Form>>> {
    return this.axiosInstance.put(`/forms/set-active/${formId}`);
  }
}

export default new ApiService();
