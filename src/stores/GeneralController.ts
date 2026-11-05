// Define a type for the possible keys in the `links` objects
type DocumentModel = 'FormDocuments' | 'ProcedureDocuments';
const baseUrl = `${import.meta.env.VITE_API_URL}`;

export class GeneralController {
    private token: string | null;

    constructor() {
        try {
            const userData = localStorage.getItem('user');
            const storedProfile = userData ? JSON.parse(userData) : null;
            this.token = storedProfile?.token || null;
        } catch (error) {
            console.error('Failed to parse user data from localStorage:', error);
            this.token = null;
        }
    }

    private async _fetch(url: string, options: RequestInit): Promise<Response> {
        if (!this.token) {
            console.error("Authentication token not available.");
            throw new Error("Authentication token not available.");
        }

        const headers: HeadersInit = {
            'Authorization': 'Bearer ' + this.token,
            ...options.headers,
        };

        const response = await fetch(url, {
            ...options,
            headers: headers,
        });

        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}));
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${JSON.stringify(errorBody)}`);
        }

        return response;
    }

    /**
     * Retrieves data via an instance POST request.
     */
    public async retrieveData<T>(apiLink: string, formData: any, columnName: string): Promise<T[] | any[]> {
        try {
            const options: RequestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            };
            const response = await this._fetch(apiLink, options);
            const data = await response.json();
            return data[columnName];
        } catch (error) {
            console.error("Error in instance retrieveData:", error);
            return [];
        }
    }

    /**
     * Retrieves data via a static POST request.
     */
    static async retrieveData<T>(apiLink: string, formData: any, columnName: string): Promise<T[] | any[]> {
        try {
            const token = getToken();
            const options: RequestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            };
            const response = await fetch(baseUrl + apiLink, options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data[columnName] || [];
        } catch (error: any) {
            console.error("Error in static retrieveData:", error);
            return [];
        }
    }

    /**
     * Retrieves data via an instance GET request.
     */
    public async retrieveGETData<T>(apiLink: string, columnName: string): Promise<T[] | any[]> {
        try {
            const options: RequestInit = {
                method: 'GET',
            };
            const response = await this._fetch(apiLink, options);
            const data = await response.json();
            return data[columnName];
        } catch (error) {
            console.error("Error in retrieveGETData:", error);
            return [];
        }
    }

    /**
     * Retrieves data via a static GET request.
     */
    static async retrieveDataGet<T>(apiLink: string, columnName: string): Promise<T[] | any[]> {
        try {
            const token = getToken();
            const options: RequestInit = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };
            const response = await fetch(baseUrl + apiLink, options);
            const data = await response.json();
            return data[columnName];
        } catch (error) {
            console.error("Error in static retrieveDataGet:", error);
            return [];
        }
    }

    /**
     * Retrieves a file via a static POST request.
     */
    static async retrieveFile(data: any, targetApiLink: string): Promise<Blob> {
        try {
            const token = getToken();
            const fetchOptions: RequestInit = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };

            const response = await fetch(baseUrl + targetApiLink, fetchOptions);

            if (!response.ok) {
                let errorInfo = `HTTP error! Status: ${response.status}`;
                try {
                    const errorJson = await response.json();
                    errorInfo += `, Details: ${JSON.stringify(errorJson)}`;
                } catch (e) {
                    const errorText = await response.text();
                    errorInfo += `, Response: "${errorText.substring(0, 100)}..."`;
                }
                throw new Error(errorInfo);
            }

            return await response.blob();
        } catch (err) {
            console.error("API Call Error in static GeneralController.retrieveFile:", err);
            throw err;
        }
    }

    /**
     * Retrieves a file via a static GET request.
     */
    static async retrieveGetFile(targetApiLink: string): Promise<Blob> {
        try {
            const token = getToken();
            const fetchOptions: RequestInit = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            const response = await fetch(baseUrl + targetApiLink, fetchOptions);

            if (!response.ok) {
                let errorInfo = `HTTP error! Status: ${response.status}`;
                try {
                    const errorJson = await response.json();
                    errorInfo += `, Details: ${JSON.stringify(errorJson)}`;
                } catch (e) {
                    const errorText = await response.text();
                    errorInfo += `, Response: "${errorText.substring(0, 100)}..."`;
                }
                throw new Error(errorInfo);
            }

            return await response.blob();
        } catch (err) {
            console.error("API Call Error in static GeneralController.retrieveGetFile:", err);
            throw err;
        }
    }

    /**
     * Retrieves a file via an instance POST request (Corrected Typo).
     */
    public async retrieveFile(apiLink: string, column: any): Promise<Blob | any[]> {
        try {
            const options: RequestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(column),
            };
            const response = await this._fetch(apiLink, options);
            return await response.blob();
        } catch (error) {
            console.error("Error in instance retrieveFile:", error);
            return [];
        }
    }

    /**
     * Stores an item via a POST request with multipart/form-data.
     */
    static async storeItem(apiLink: string, data: FormData): Promise<Response> {
        const token = getToken();
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
            body: data,
        };
        try {
            return await fetch(baseUrl + apiLink, options);
        } catch (error) {
            console.error("Error in storeItem:", error);
            throw error;
        }
    }

    /**
     * Stores JSON data via a POST request.
     */
    static async storeJson(apiLink: string, data: any): Promise<Response> {
        const token = getToken();
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        try {
            return await fetch(baseUrl + apiLink, options);
        } catch (error) {
            console.error("Error in storeJson:", error);
            throw error;
        }
    }

    static async storeItemFiles(apiLink: string, data: FormData): Promise<any> {
        const token = getToken();
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
            body: data,
        };

        const response = await fetch(baseUrl + apiLink, options);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        return await response.json();
    }

    /**
     * Removes an item via a POST request.
     */
    static async removeItem(apiLink: string, data: FormData): Promise<Response> {
        const token = getToken();
        const options: RequestInit = {
            method: 'POST',
            body: data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        try {
            return await fetch(baseUrl + apiLink, options);
        } catch (error) {
            console.error("Error in removeItem:", error);
            throw error;
        }
    }

    /**
     * Sends a print log request via a POST request.
     */
    public async printLog(model: DocumentModel, data: FormData): Promise<Response> {
        const links: Record<DocumentModel, string> = {
            FormDocuments: '/forms/form-documents/print',
            ProcedureDocuments: '/procedure/procedure-documents/print'
        };
        const link: string | undefined = links[model];

        if (!link) {
            console.error(`Invalid model provided for printLog: ${model}`);
            throw new Error(`Invalid model: ${model}`);
        }

        const options: RequestInit = {
            method: 'POST',
            body: data,
        };
        try {
            return await this._fetch(link, options);
        } catch (error) {
            console.error("Error in printLog:", error);
            throw error;
        }
    }

    /**
     * Downloads a file via a POST request.
     */
    public async downloadFile(model: DocumentModel, data: FormData): Promise<Blob> {
        const links: Record<DocumentModel, string> = {
            FormDocuments: '/forms/form-documents/download',
            ProcedureDocuments: '/procedure/procedure-documents/download'
        };
        const link: string | undefined = links[model];

        if (!link) {
            console.error(`Invalid model provided for downloadFile: ${model}`);
            throw new Error(`Invalid model: ${model}`);
        }

        const options: RequestInit = {
            method: 'POST',
            body: data,
        };
        try {
            const response = await this._fetch(link, options);
            return await response.blob();
        } catch (error) {
            console.error("Error in downloadFile:", error);
            throw error;
        }
    }

    /**
     * Retrieves analytics data via a POST request (Corrected Typo).
     */
    public async retrieveAnalytics<T>(model: DocumentModel, data: any): Promise<T | any[]> {
        const links: Record<DocumentModel, string> = {
            FormDocuments: '/forms/form-documents/analytics',
            ProcedureDocuments: '/procedure/procedure-documents/analytics'
        };
        const apiLink: string | undefined = links[model];

        if (!apiLink) {
            console.error(`Invalid model provided for retrieveAnalytics: ${model}`);
            return [];
        }

        try {
            const options: RequestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };
            const response = await this._fetch(apiLink, options);
            return await response.json();
        } catch (error) {
            console.error("Error in retrieveAnalytics:", error);
            return [];
        }
    }

    /**
     * Gets analytics data for a specific column via a POST request.
     */
    public async getAnalytics<T>(model: DocumentModel, data: any, column: string): Promise<T[] | any[]> {
        const links: Record<DocumentModel, string> = {
            FormDocuments: '/forms/show/analytics',
            ProcedureDocuments: '/procedure/show/analytics'
        };
        const apiLink: string | undefined = links[model];

        if (!apiLink) {
            console.error(`Invalid model provided for getAnalytics: ${model}`);
            return [];
        }

        try {
            const options: RequestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };
            const response = await this._fetch(apiLink, options);
            const responseData = await response.json();
            return responseData[column];
        } catch (error) {
            console.error("Error in getAnalytics:", error);
            return [];
        }
    }
}

function getToken(): string | null {
    try {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parse = JSON.parse(userData);
            return parse?.token || null;
        }
    } catch (e) {
        console.error("Failed to retrieve token from localStorage:", e);
    }
    return null;
}