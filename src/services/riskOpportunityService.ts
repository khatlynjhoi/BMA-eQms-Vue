import { api } from './api';
import type { RiskAssessment, OpportunityItem } from '@/types';

export class RiskOpportunityService {
    private request = (url: string, options?: RequestInit) =>
        api(url, options).then(res => res.json());

    // ── THREAT RISKS (Clause 6.1.1) ─────────────────────────
    retrieveRiskList = (formData?: any): Promise<RiskAssessment[]> =>
        this.request('risk-and-opportunity/retrieveDataList', {
            method: 'POST',
            body: JSON.stringify(formData || {})
        });

    viewRisk = (riskId: string | number): Promise<RiskAssessment> =>
        this.request('risk-and-opportunity/view-risk', {
            method: 'POST',
            body: JSON.stringify({ riskId })
        });

    storeRisk = (riskData: Partial<RiskAssessment>): Promise<any> =>
        this.request('risk-and-opportunity/store-risk', {
            method: 'POST',
            body: JSON.stringify(riskData)
        });

    // ── OPPORTUNITIES REGISTER (Clause 6.1.2) [NEW 2026] ────
    retrieveOpportunityList = (): Promise<OpportunityItem[]> =>
        this.request('risk-and-opportunity/retrieve-opportunities');

    storeOpportunity = (opportunityData: Partial<OpportunityItem>): Promise<any> =>
        this.request('risk-and-opportunity/store-opportunity', {
            method: 'POST',
            body: JSON.stringify(opportunityData)
        });

    updateOpportunityStatus = (id: string, status: string): Promise<any> =>
        this.request('risk-and-opportunity/update-opportunity-status', {
            method: 'POST',
            body: JSON.stringify({ id, status })
        });
}