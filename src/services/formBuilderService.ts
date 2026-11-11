import { api } from './api';

export interface FormSchemaItem {
  id: number | string;
  form_code?: string;
  form_name: string;
  form_schema?: any;
}

export class FormBuilderService {
  private request = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const res = await api(url, options);
    return res.json();
  };

  getFormList = (): Promise<FormSchemaItem[]> =>
    this.request<FormSchemaItem[]>('form-builder/retrieve-forms');

  storeForm = (formData: Record<string, any> | FormData): Promise<any> => {
    const isFormData = formData instanceof FormData;
    return this.request('form-builder/create-form', {
      method: 'POST',
      body: isFormData ? formData : JSON.stringify(formData)
    });
  };

  buildFormList = (): Promise<any> =>
    this.request('form-builder/retrieve-build-forms');

  storeFormResponse = (formData: Record<string, any> | FormData): Promise<any> => {
    const isFormData = formData instanceof FormData;
    return this.request('form-builder/store-form-response', {
      method: 'POST',
      body: isFormData ? formData : JSON.stringify(formData)
    });
  };
}