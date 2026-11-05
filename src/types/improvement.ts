// ISO 9001:2026 Clause 9.2 - Internal Audit Program
export interface InternalAudit {
  id: string;
  auditNumber: string;
  departmentId: number;
  departmentName: string;
  auditDate: string;
  leadAuditor: string;
  auditScope: string;
  findingsCount: {
    majorNC: number;
    minorNC: number;
    opportunitiesForImprovement: number;
  };
  status: 'Scheduled' | 'In Progress' | 'Report Generated' | 'Closed';
}

// ISO 9001:2026 Clause 9.3 - Management Review Minutes
export interface ManagementReviewRecord {
  id: string;
  meetingDate: string;
  chairperson: string;
  attendees: string[];
  agendaTopics: string[];
  actionItems: Array<{
    description: string;
    assignedTo: string;
    dueDate: string;
    completed: boolean;
  }>;
  minutesFileUrl?: string;
}

// ISO 9001:2026 Clause 10.2 - Corrective Action & Non-Conformity (CAPA) Log
export interface CapaRecord {
  id: string;
  capaNumber: string;
  source: 'Internal Audit' | 'External Audit' | 'Customer Complaint' | 'Operational Failure';
  issueDescription: string;
  rootCauseAnalysis: string;
  correctiveActionPlan: string;
  preventiveActionPlan: string;
  assignedPerson: string;
  targetDate: string;
  verificationDate?: string;
  verifiedBy?: string;
  status: 'Open' | 'Under Verification' | 'Closed';
}