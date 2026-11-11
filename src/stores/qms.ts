import { defineStore } from 'pinia';
import type { ProcedureDocument, AmendmentRequest, QmsProcedureCategory } from '@/types';
import { GeneralController } from './GeneralController';

interface QmsState {
  categories: QmsProcedureCategory[];
  procedures: ProcedureDocument[];
  amendments: AmendmentRequest[];
  loading: boolean;
}

export const useQmsStore = defineStore('qms', {
  state: (): QmsState => ({
    categories: [],
    procedures: [],
    amendments: [],
    loading: false
  }),

  getters: {
    draftAmendments: (state): AmendmentRequest[] => state.amendments.filter((a) => a.status === 'Draft'),
    submittedAmendments: (state): AmendmentRequest[] => state.amendments.filter((a) => a.status === 'Pending Review')
  },

  actions: {
    async fetchCategories(): Promise<void> {
      this.loading = true;
      try {
        const controller = new GeneralController();
        const data = await controller.retrieveGETData<QmsProcedureCategory>('/qms/categories', 'categories');
        this.categories = data || [];
      } catch (error) {
        console.error('Failed to fetch QMS procedure categories:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchAmendments(): Promise<void> {
      this.loading = true;
      try {
        const controller = new GeneralController();
        const data = await controller.retrieveGETData<AmendmentRequest>('/qms/approval-workflow', 'amendments');
        this.amendments = data || [];
      } catch (error) {
        console.error('Failed to fetch amendments workflow:', error);
      } finally {
        this.loading = false;
      }
    }
  }
});