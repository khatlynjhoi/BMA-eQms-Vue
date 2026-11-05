import { defineStore } from 'pinia';
import type { ClimateAssessment, InterestedParty, QualityCultureRecord } from '@/types';
import { GeneralController } from './GeneralController';

interface GovernanceState {
  climateAssessments: ClimateAssessment[];
  interestedParties: InterestedParty[];
  qualityCultureLogs: QualityCultureRecord[];
  loading: boolean;
}

export const useGovernanceStore = defineStore('governance', {
  state: (): GovernanceState => ({
    climateAssessments: [],
    interestedParties: [],
    qualityCultureLogs: [],
    loading: false
  }),

  actions: {
    async fetchClimateAssessments() {
      this.loading = true;
      try {
        const controller = new GeneralController();
        const data = await controller.retrieveGETData<ClimateAssessment>('/context/climate', 'assessments');
        this.climateAssessments = data || [];
      } catch (error) {
        console.error('Failed to fetch climate assessments:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchInterestedParties() {
      this.loading = true;
      try {
        const controller = new GeneralController();
        const data = await controller.retrieveGETData<InterestedParty>('/context/interested-parties', 'parties');
        this.interestedParties = data || [];
      } catch (error) {
        console.error('Failed to fetch interested parties:', error);
      } finally {
        this.loading = false;
      }
    }
  }
});