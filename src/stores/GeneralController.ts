type DocumentModel = 'FormDocuments' | 'ProcedureDocuments';

const rawApiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const baseUrl = rawApiUrl.endsWith('/') ? rawApiUrl : `${rawApiUrl}/`;

function getToken(): string | null {
  try {
    const directToken = localStorage.getItem('laravel_api_token') || localStorage.getItem('token');
    if (directToken) return directToken;

    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      return parsed?.token || parsed?.access_token || null;
    }
  } catch (e) {
    console.error('Failed to retrieve token from localStorage:', e);
  }
  return null;
}

export class GeneralController {
  private token: string | null;

  constructor() {
    this.token = getToken();
  }

  private async _fetch(url: string, options: RequestInit): Promise<Response> {
    if (!this.token) {
      this.token = getToken();
    }

    if (!this.token) {
      console.error('Authentication token not available.');
      throw new Error('Authentication token not available.');
    }

    const isFormData = options.body instanceof FormData;
    const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? url.slice(1) : url}`;

    const headers: HeadersInit = {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`,
      ...(options.headers || {})
    };

    const response = await fetch(fullUrl, {
      ...options,
      headers
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${JSON.stringify(errorBody)}`);
    }

    return response;
  }

  public async retrieveData<T>(apiLink: string, formData: any, columnName: string): Promise<T[]> {
    try {
      const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify(formData)
      };
      const response = await this._fetch(apiLink, options);
      const data = await response.json();
      return data[columnName] || [];
    } catch (error) {
      console.error('Error in instance retrieveData:', error);
      return [];
    }
  }

  static async retrieveData<T>(apiLink: string, formData: any, columnName: string): Promise<T[]> {
    try {
      const token = getToken();
      const options: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(formData)
      };
      const response = await fetch(`${baseUrl}${apiLink.startsWith('/') ? apiLink.slice(1) : apiLink}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data[columnName] || [];
    } catch (error: any) {
      console.error('Error in static retrieveData:', error);
      return [];
    }
  }

  public async retrieveGETData<T>(apiLink: string, columnName: string): Promise<T[]> {
    try {
      const options: RequestInit = { method: 'GET' };
      const response = await this._fetch(apiLink, options);
      const data = await response.json();
      return data[columnName] || [];
    } catch (error) {
      console.error('Error in retrieveGETData:', error);
      return [];
    }
  }

  static async retrieveDataGet<T>(apiLink: string, columnName: string): Promise<T[]> {
    try {
      const token = getToken();
      const options: RequestInit = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      };
      const response = await fetch(`${baseUrl}${apiLink.startsWith('/') ? apiLink.slice(1) : apiLink}`, options);
      const data = await response.json();
      return data[columnName] || [];
    } catch (error) {
      console.error('Error in static retrieveDataGet:', error);
      return [];
    }
  }

  static async retrieveFile(data: any, targetApiLink: string): Promise<Blob> {
    const token = getToken();
    const fetchOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(data)
    };

    const response = await fetch(`${baseUrl}${targetApiLink.startsWith('/') ? targetApiLink.slice(1) : targetApiLink}`, fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.blob();
  }

  static async retrieveGetFile(targetApiLink: string): Promise<Blob> {
    const token = getToken();
    const fetchOptions: RequestInit = {
      method: 'GET',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    };

    const response = await fetch(`${baseUrl}${targetApiLink.startsWith('/') ? targetApiLink.slice(1) : targetApiLink}`, fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.blob();
  }

  public async retrieveFile(apiLink: string, column: any): Promise<Blob> {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(column)
    };
    const response = await this._fetch(apiLink, options);
    return await response.blob();
  }

  static async storeItem(apiLink: string, data: FormData): Promise<Response> {
    const token = getToken();
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: data
    };
    return await fetch(`${baseUrl}${apiLink.startsWith('/') ? apiLink.slice(1) : apiLink}`, options);
  }

  static async storeJson(apiLink: string, data: any): Promise<Response> {
    const token = getToken();
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(data)
    };
    return await fetch(`${baseUrl}${apiLink.startsWith('/') ? apiLink.slice(1) : apiLink}`, options);
  }

  static async storeItemFiles(apiLink: string, data: FormData): Promise<any> {
    const token = getToken();
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: data
    };

    const response = await fetch(`${baseUrl}${apiLink.startsWith('/') ? apiLink.slice(1) : apiLink}`, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return await response.json();
  }

  static async removeItem(apiLink: string, data: FormData | Record<string, any>): Promise<Response> {
    const token = getToken();
    const isFormData = data instanceof FormData;
    const options: RequestInit = {
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data),
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    };
    return await fetch(`${baseUrl}${apiLink.startsWith('/') ? apiLink.slice(1) : apiLink}`, options);
  }

  public async printLog(model: DocumentModel, data: FormData): Promise<Response> {
    const links: Record<DocumentModel, string> = {
      FormDocuments: 'forms/form-documents/print',
      ProcedureDocuments: 'procedure/procedure-documents/print'
    };
    const link = links[model];
    if (!link) throw new Error(`Invalid model: ${model}`);

    return await this._fetch(link, { method: 'POST', body: data });
  }

  public async downloadFile(model: DocumentModel, data: FormData): Promise<Blob> {
    const links: Record<DocumentModel, string> = {
      FormDocuments: 'forms/form-documents/download',
      ProcedureDocuments: 'procedure/procedure-documents/download'
    };
    const link = links[model];
    if (!link) throw new Error(`Invalid model: ${model}`);

    const response = await this._fetch(link, { method: 'POST', body: data });
    return await response.blob();
  }

  public async retrieveAnalytics<T>(model: DocumentModel, data: any): Promise<T | any[]> {
    const links: Record<DocumentModel, string> = {
      FormDocuments: 'forms/form-documents/analytics',
      ProcedureDocuments: 'procedure/procedure-documents/analytics'
    };
    const apiLink = links[model];
    if (!apiLink) return [];

    try {
      const response = await this._fetch(apiLink, {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      console.error('Error in retrieveAnalytics:', error);
      return [];
    }
  }

  public async getAnalytics<T>(model: DocumentModel, data: any, column: string): Promise<T[]> {
    const links: Record<DocumentModel, string> = {
      FormDocuments: 'forms/show/analytics',
      ProcedureDocuments: 'procedure/show/analytics'
    };
    const apiLink = links[model];
    if (!apiLink) return [];

    try {
      const response = await this._fetch(apiLink, {
        method: 'POST',
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      return responseData[column] || [];
    } catch (error) {
      console.error('Error in getAnalytics:', error);
      return [];
    }
  }
}