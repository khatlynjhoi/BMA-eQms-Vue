import { api } from './api';
import type { ClimateAssessment, InterestedParty } from '@/types';

export class GovernanceService {
    private request = (url: string, options?: RequestInit) =>
        api(url, options).then(res => res.json());

    // Clause 4.1: Climate Assessments
    getClimateAssessments = (): Promise<ClimateAssessment[]> =>
        this.request('context/climate-assessments');

    storeClimateAssessment = (data: Partial<ClimateAssessment>): Promise<any> =>
        this.request('context/store-climate-assessment', {
            method: 'POST',
            body: JSON.stringify(data)
        });

    // Clause 4.2: Interested Parties (STCW / CHED / MARINA)
    getInterestedParties = (): Promise<InterestedParty[]> =>
        this.request('context/interested-parties');

    storeInterestedParty = (party: Partial<InterestedParty>): Promise<any> =>
        this.request('context/store-interested-party', {
            method: 'POST',
            body: JSON.stringify(party)
        });
}