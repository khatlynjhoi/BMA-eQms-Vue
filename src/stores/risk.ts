import { defineStore } from 'pinia';
import type { RiskAssessment, OpportunityItem, QualityObjective } from '@/types';
import { GeneralController } from './GeneralController';

interface RiskState {
  riskAssessments: RiskAssessment[];
  opportunities: OpportunityItem[];
  qualityObjectives: QualityObjective[];
  loading: boolean;
}

export const useRiskStore = defineStore('risk', {
  state: (): RiskState => ({
    riskAssessments: [],
    opportunities: [],
    qualityObjectives: [],
    loading: false
  }),

  getters: {
    pendingRisks: (state): RiskAssessment[] => state.riskAssessments.filter((r) => r.status === 'Draft'),
    approvedRisks: (state): RiskAssessment[] => state.riskAssessments.filter((r) => r.status === 'Approved'),
    achievedOpportunities: (state): OpportunityItem[] => state.opportunities.filter((o) => o.status === 'Achieved')
  },

  actions: {
    async fetchRiskAssessments(): Promise<void> {
      this.loading = true;
      try {
        const controller = new GeneralController();
        const data = await controller.retrieveGETData<RiskAssessment>('/risk/assessments', 'risks');
        this.riskAssessments = data || [];
      } catch (error) {
        console.error('Failed to fetch risk assessments:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchOpportunities(): Promise<void> {
      this.loading = true;
      try {
        const controller = new GeneralController();
        const data = await controller.retrieveGETData<OpportunityItem>('/risk/opportunities', 'opportunities');
        this.opportunities = data || [];
      } catch (error) {
        console.error('Failed to fetch opportunities:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchQualityObjectives(): Promise<void> {
      this.loading = true;
      try {
        const controller = new GeneralController();
        const data = await controller.retrieveGETData<QualityObjective>('/quality-objectives/list', 'objectives');
        this.qualityObjectives = data || [];
      } catch (error) {
        console.error('Failed to fetch quality objectives:', error);
      } finally {
        this.loading = false;
      }
    }
  }
});