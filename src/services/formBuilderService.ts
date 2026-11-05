import { api } from './api';

export interface FormSchemaItem {
  id: number;
  name: string;
}

export class FormBuilderService {
  private request = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const res = await api(url, options);
    return res.json();
  };

  getFormList = (): Promise<FormSchemaItem[]> =>
    this.request<FormSchemaItem[]>('form-builder/retrieve-forms');

  storeForm = (formData: Record<string, any>): Promise<any> =>
    this.request('form-builder/create-form', {
      method: 'POST',
      body: JSON.stringify(formData)
    });

  buildFormList = (): Promise<any> =>
    this.request('form-builder/retrieve-build-forms');

  storeFormResponse = (formData: Record<string, any>): Promise<any> =>
    this.request('form-builder/store-form-response', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
}