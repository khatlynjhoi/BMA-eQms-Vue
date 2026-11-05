// ISO 9001:2026 Clause 6.1.1 - Threat Risk Assessment
export interface RiskAssessment {
  id: string;
  date: string;
  activityProcessProcedure: string;
  departmentId?: number;
  riskDescription?: string;
  severityRating?: number;
  likelihoodRating?: number;
  riskLevel?: 'Low' | 'Medium' | 'High' | 'Critical';
  mitigationPlan?: string;
  status: 'Draft' | 'Approved' | 'Submitted';
}

// ISO 9001:2026 Clause 6.1.2 - Opportunity Register
export interface OpportunityItem {
  id: string;
  dateCreated: string;
  opportunityTitle: string;
  category: 'Process Enhancement' | 'Technology Adoption' | 'Facility Upgrade' | 'Resource Optimization';
  expectedOutcome: string;
  requiredResources: string;
  actionPlan: string;
  targetCompletionDate: string;
  responsiblePerson: string;
  status: 'Identified' | 'Under Evaluation' | 'In Progress' | 'Achieved';
}

// ISO 9001:2026 Clause 6.2 - Quality Objectives Monitoring
export interface QualityObjective {
  id: string;
  academicYear: string;
  procedure: string;
  objectivesCount: number;
  completionCount: number;
  completionPercentage?: number;
  status?: 'Pending' | 'In Progress' | 'Completed';
}