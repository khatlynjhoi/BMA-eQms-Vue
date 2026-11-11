import { api } from './api';
import type { ClimateAssessment, InterestedParty } from '@/types';

export class GovernanceService {
  private request = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const res = await api(url, options);
    return res.json();
  };

  // Clause 4.1: Climate Assessments
  getClimateAssessments = (): Promise<ClimateAssessment[]> =>
    this.request<ClimateAssessment[]>('context/climate-assessments');

  storeClimateAssessment = (data: Partial<ClimateAssessment>): Promise<any> =>
    this.request('context/store-climate-assessment', {
      method: 'POST',
      body: JSON.stringify(data)
    });

  // Clause 4.2: Interested Parties (STCW / CHED / MARINA / Industry Partners)
  getInterestedParties = (): Promise<InterestedParty[]> =>
    this.request<InterestedParty[]>('context/interested-parties');

  storeInterestedParty = (party: Partial<InterestedParty>): Promise<any> =>
    this.request('context/store-interested-party', {
      method: 'POST',
      body: JSON.stringify(party)
    });
}