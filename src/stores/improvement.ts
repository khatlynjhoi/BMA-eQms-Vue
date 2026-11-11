import { defineStore } from 'pinia';
import type { InternalAudit, ManagementReviewRecord, CapaRecord } from '@/types';
import { GeneralController } from './GeneralController';

interface ImprovementState {
  internalAudits: InternalAudit[];
  managementReviews: ManagementReviewRecord[];
  capaLogs: CapaRecord[];
  loading: boolean;
}

export const useImprovementStore = defineStore('improvement', {
  state: (): ImprovementState => ({
    internalAudits: [],
    managementReviews: [],
    capaLogs: [],
    loading: false
  }),

  getters: {
    openCapas: (state): CapaRecord[] => state.capaLogs.filter((c) => c.status === 'Open'),
    scheduledAudits: (state): InternalAudit[] => state.internalAudits.filter((a) => a.status === 'Scheduled')
  },

  actions: {
    async fetchInternalAudits(): Promise<void> {
      this.loading = true;
      try {
        const controller = new GeneralController();
        const data = await controller.retrieveGETData<InternalAudit>('/improvement/internal-audits', 'audits');
        this.internalAudits = data || [];
      } catch (error) {
        console.error('Failed to fetch internal audits:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchCapaLogs(): Promise<void> {
      this.loading = true;
      try {
        const controller = new GeneralController();
        const data = await controller.retrieveGETData<CapaRecord>('/improvement/capa-logs', 'capas');
        this.capaLogs = data || [];
      } catch (error) {
        console.error('Failed to fetch CAPA logs:', error);
      } finally {
        this.loading = false;
      }
    }
  }
});