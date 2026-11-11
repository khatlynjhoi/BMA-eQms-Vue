import { api } from './api';

export interface FormResponseItem {
  id: number | string;
  form_name: string;
  control_number?: string;
  status?: string | null;
  created_at?: string;
}

export class FormResponseService {
  private request = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const res = await api(url, options);
    return res.json();
  };

  getFormList = (): Promise<{ formList: any[]; requestList: FormResponseItem[] }> =>
    this.request<{ formList: any[]; requestList: FormResponseItem[] }>('form-response/retrieve-build-forms');

  viewResponsePdf = async (responseId: string | number): Promise<Blob> => {
    const res = await api(`form-response/preview-response?response=${encodeURIComponent(responseId)}`, {
      method: 'GET'
    });
    return res.blob();
  };

  retrieveFormResponse = (): Promise<any> =>
    this.request('form-response/retrieve-forms-response');

  storeFormResponse = (formData: Record<string, any> | FormData): Promise<any> => {
    const isFormData = formData instanceof FormData;
    return this.request('form-response/store-form-response', {
      method: 'POST',
      body: isFormData ? formData : JSON.stringify(formData)
    });
  };

  updateFormResponse = (formData: Record<string, any> | FormData): Promise<any> => {
    const isFormData = formData instanceof FormData;
    return this.request('form-response/update-form-response', {
      method: 'POST',
      body: isFormData ? formData : JSON.stringify(formData)
    });
  };

  removeFormResponse = (formData: Record<string, any> | FormData): Promise<any> => {
    const isFormData = formData instanceof FormData;
    return this.request('form-response/remove-form-response', {
      method: 'POST',
      body: isFormData ? formData : JSON.stringify(formData)
    });
  };
}