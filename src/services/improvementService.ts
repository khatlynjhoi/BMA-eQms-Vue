import { api } from './api';
import type { InternalAudit, ManagementReviewRecord, CapaRecord } from '@/types';

export class ImprovementService {
  private request = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const res = await api(url, options);
    return res.json();
  };

  // Clause 9.2: Internal Audits
  getInternalAudits = (): Promise<InternalAudit[]> =>
    this.request<InternalAudit[]>('improvement/internal-audits');

  // Clause 9.3: Management Reviews
  getManagementReviews = (): Promise<ManagementReviewRecord[]> =>
    this.request<ManagementReviewRecord[]>('improvement/management-reviews');

  // Clause 10.2: CAPA Logs
  getCapaLogs = (): Promise<CapaRecord[]> =>
    this.request<CapaRecord[]>('improvement/capa-logs');

  storeCapa = (capa: Partial<CapaRecord>): Promise<any> =>
    this.request('improvement/store-capa', {
      method: 'POST',
      body: JSON.stringify(capa)
    });
}