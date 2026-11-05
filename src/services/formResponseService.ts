import { api } from './api';

export class FormResponseService {
  private request = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const res = await api(url, options);
    return res.json();
  };

  getFormList = (): Promise<{ id: number; name: string }[]> =>
    this.request<{ id: number; name: string }[]>('form-response/retrieve-build-forms');

  viewResponsePdf = async (responseId: string): Promise<Blob> => {
    const res = await api(`form-response/preview-response?response=${encodeURIComponent(responseId)}`, {
      method: 'GET'
    });
    return res.blob();
  };

  retrieveFormResponse = (): Promise<any> =>
    this.request('form-response/retrieve-forms-response');

  storeFormResponse = (formData: Record<string, any>): Promise<any> =>
    this.request('form-response/store-form-response', { 
      method: 'POST', 
      body: JSON.stringify(formData) 
    });

  updateFormResponse = (formData: Record<string, any>): Promise<any> =>
    this.request('form-response/update-form-response', { 
      method: 'POST', 
      body: JSON.stringify(formData) 
    });

  removeFormResponse = (formData: Record<string, any>): Promise<any> =>
    this.request('form-response/remove-form-response', { 
      method: 'POST', 
      body: JSON.stringify(formData) 
    });
}