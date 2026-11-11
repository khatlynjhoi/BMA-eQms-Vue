// ISO 9001:2026 Clause 7.5 - Process and Forms
export interface QmsProcedureCategory {
  id: number | string;
  categoryName: string;
  procedureCount: number;
}

export interface ProcedureDocument {
  id: number | string;
  procedureName: string;
  version: string;
  category: string;
  author: string;
  lastUpdated: string;
  fileUrl?: string;
}

// ISO 9001:2026 Clause 6.3 - Management of Change (MOC / Amendments)
export interface AmendmentRequest {
  id: number | string;
  procedureFormName: string;
  category: string;
  descriptionOfChanges: string;
  communicationPlan: string;
  effectivenessMetric: string;
  reviewScheduleDate: string;
  dateCreated: string;
  createdBy?: string;
  status: 'Draft' | 'Pending Review' | 'Approved' | 'Rejected';
}

// Workspace Submissions
export interface WorkspaceRequest {
  controlNumber: string;
  formName: string;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
  dateCreated: string;
}