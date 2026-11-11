import type { RouteRecordRaw } from 'vue-router';

const appendRoute = (
  parent: RouteRecordRaw,
  name: string,
  path: string,
  title: string,
  component: () => Promise<any>
): void => {
  if (parent.children) {
    parent.children.push({
      name,
      path,
      component,
      meta: { title, requiresAuth: true }
    });
  }
};

const EmployeeRoutes: RouteRecordRaw = {
  path: '/',
  component: () => import('@/layouts/dashboard/DashboardLayout.vue'),
  children: []
};

// 1. CONTEXT OF THE ORGANIZATION (ISO 9001:2026 Clause 4)
appendRoute(EmployeeRoutes, 'EmployeeContextClimate', '/context/climate', 'Climate & Context Assessment', () =>
  import('@/views/context/ClimateAssessment.vue')
);
appendRoute(EmployeeRoutes, 'EmployeeContextStakeholders', '/context/stakeholders', 'Interested Parties Register', () =>
  import('@/views/context/Stakeholders.vue')
);
appendRoute(EmployeeRoutes, 'EmployeeQualityCulture', '/context/policy-culture', 'Quality Policy & Ethics', () =>
  import('@/views/context/QualityCulture.vue')
);

// 2. RISK & OPPORTUNITIES MANAGEMENT (ISO 9001:2026 Clause 6.1)
appendRoute(EmployeeRoutes, 'EmployeeRiskManagement', '/risk/risk-management', 'Risk Register Workspace', () =>
  import('@/views/risk-management/RiskManagement.vue')
);
appendRoute(EmployeeRoutes, 'EmployeeCreateRisk', '/risk/risk-management/create-new', 'Register Risk Assessment', () =>
  import('@/views/risk-management/AddRiskAssessment.vue')
);
appendRoute(EmployeeRoutes, 'EmployeeViewRisk', '/risk/risk-management/view/:id', 'View Risk Assessment', () =>
  import('@/views/risk-management/ViewRiskAssessment.vue')
);
appendRoute(EmployeeRoutes, 'EmployeeOpportunityRegister', '/risk/opportunity-register', 'Opportunity Register', () =>
  import('@/views/risk-management/OpportunityRegister.vue')
);

// 3. QUALITY OBJECTIVES (ISO 9001:2026 Clause 6.2)
appendRoute(EmployeeRoutes, 'EmployeeQualityObjectives', '/quality-objectives', 'Quality Objectives Workspace', () =>
  import('@/views/quality-objectives/QualityObjective.vue')
);

// 4. CONTINUAL IMPROVEMENT & AUDITS (ISO 9001:2026 Clause 9 & 10)
appendRoute(EmployeeRoutes, 'EmployeeImprovementCapa', '/improvement/capa', 'Corrective Action (CAPA) Log', () =>
  import('@/views/improvement/CapaLog.vue')
);
appendRoute(EmployeeRoutes, 'EmployeeImprovementAudits', '/improvement/internal-audits', 'Internal Audits Schedule', () =>
  import('@/views/improvement/InternalAudits.vue')
);
appendRoute(EmployeeRoutes, 'EmployeeImprovementReviews', '/improvement/management-review', 'Management Review', () =>
  import('@/views/improvement/ManagementReview.vue')
);

// 5. FORM BUILDER & WORKSPACE REPORTS (ISO 9001:2026 Clause 7.5 & 8.1)
appendRoute(EmployeeRoutes, 'EmployeeFormBuilder', '/form-builder', 'Form Builder Studio', () =>
  import('@/views/form-builder/FormBuilder.vue')
);
appendRoute(EmployeeRoutes, 'EmployeeReportsWorkspace', '/reports/workspace', 'Workspace Dynamic Reports', () =>
  import('@/views/reports/Workspace.vue')
);
appendRoute(EmployeeRoutes, 'EmployeeReportsSubmission', '/reports/submissions', 'Form Submissions Directory', () =>
  import('@/views/reports/Submission.vue')
);
appendRoute(EmployeeRoutes, 'EmployeeReportsTrack', '/reports/track-submission', 'Track Submission Status', () =>
  import('@/views/reports/TrackSubmission.vue')
);

// 6. ADMINISTRATION & ACCOUNT MANAGEMENT (ISO 9001:2026 Clause 5.3)
appendRoute(EmployeeRoutes, 'EmployeeAccountManagement', '/account-management', 'User Account Administration', () =>
  import('@/views/account-management/AccountManagement.vue')
);
appendRoute(EmployeeRoutes, 'EmployeeRolesManagement', '/system/roles', 'Roles & Permissions Matrix', () =>
  import('@/views/system-management/Roles.vue')
);
appendRoute(EmployeeRoutes, 'EmployeeDepartmentsManagement', '/system/departments', 'Departments Directory', () =>
  import('@/views/system-management/Departments.vue')
);

export default EmployeeRoutes;