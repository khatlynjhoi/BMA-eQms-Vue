// ISO 9001:2026 Clause 4.1 - Context & Climate Considerations
export interface ClimateAssessment {
  id: string;
  academicYear: string;
  departmentId: number;
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
  id: string;
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
  id: string;
  employeeId: number;
  employeeName: string;
  department: string;
  policyAcknowledged: boolean;
  acknowledgementDate: string;
  ethicsTrainingCompleted: boolean;
}