import { api } from './api';
import type { InternalAudit, ManagementReviewRecord, CapaRecord } from '@/types';

export class ImprovementService {
    private request = (url: string, options?: RequestInit) =>
        api(url, options).then(res => res.json());

    // Clause 9.2: Internal Audits
    getInternalAudits = (): Promise<InternalAudit[]> =>
        this.request('improvement/internal-audits');

    // Clause 9.3: Management Reviews
    getManagementReviews = (): Promise<ManagementReviewRecord[]> =>
        this.request('improvement/management-reviews');

    // Clause 10.2: CAPA Logs
    getCapaLogs = (): Promise<CapaRecord[]> =>
        this.request('improvement/capa-logs');

    storeCapa = (capa: Partial<CapaRecord>): Promise<any> =>
        this.request('improvement/store-capa', {
            method: 'POST',
            body: JSON.stringify(capa)
        });
}