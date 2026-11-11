// ISO 9001:2026 Clause 4.1 - Context & Climate Considerations
export interface ClimateAssessment {
  id: number | string;
  academicYear: string;
  departmentId: number | string;
  departmentName: string;
  physicalRiskImpact: 'Low' | 'Medium' | 'High' | 'Severe';
  regulatoryImpact: 'Compliant' | 'Pending Review' | 'Non-Compliant';
  mitigationStrategy: string;
  evaluationNotes: string;
  assessedBy: string;
  dateAssessed: string;
  status: 'Draft' | 'Submitted' | 'Approved';
}

// ISO 9001:2026 Clause 4.2 - Interested Parties Register (STCW / CHED / MARINA)
export interface InterestedParty {
  id: number | string;
  stakeholderName: string;
  category: 'Regulatory Body' | 'Industry Partner' | 'Cadets' | 'Faculty & Staff';
  needsAndExpectations: string;
  applicableRequirements: string;
  monitoringMethod: string;
  reviewFrequency: 'Quarterly' | 'Bi-Annual' | 'Annual';
  updatedAt: string;
}

// ISO 9001:2026 Clause 5.1 & 7.3 - Quality Policy & Ethics Verification
export interface QualityCultureRecord {
  id: number | string;
  employeeId: number | string;
  employeeName: string;
  department: string;
  policyAcknowledged: boolean;
  acknowledgementDate: string;
  ethicsTrainingCompleted: boolean;
}