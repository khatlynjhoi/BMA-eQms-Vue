// Helper function to build child routes with unified meta flags
export const appendRoute = (
  prop: string, 
  name: string, 
  path: string, 
  metaName: string, 
  importComponent: () => Promise<any>
) => {
  return {
    path,
    name: `${prop}.${name}`,
    meta: {
      requiresAuth: true,
      auth: true,
      name: metaName,
      user: 'admin'
    },
    component: importComponent
  };
};

export const adminRoute = (prop: string) => [
  // -------------------------------------------------------------
  // DASHBOARD
  // -------------------------------------------------------------
  appendRoute(prop, 'default-dashboard', 'dashboard', 'Dashboard', () => import('@/views/dashboards/employee/Dashboard.vue')),
  appendRoute(prop, 'dashboard-v2', 'dashboard/v2', 'Dashboard v2', () => import('@/views/dashboards/employee/Dashboard.vue')),

  // -------------------------------------------------------------
  // 1. CONTEXT & GOVERNANCE (ISO 9001:2026 Clause 4 & 5)
  // -------------------------------------------------------------
  appendRoute(prop, 'context-climate', '/context/climate', 'Climate & Context Assessment', () => import('@/views/context/ClimateAssessment.vue')),
  appendRoute(prop, 'context-stakeholders', '/context/stakeholders', 'Interested Parties Register', () => import('@/views/context/Stakeholders.vue')),
  appendRoute(prop, 'quality-culture', '/context/policy-culture', 'Quality Policy & Ethics', () => import('@/views/context/QualityCulture.vue')),

  // -------------------------------------------------------------
  // 2. RISK & OPPORTUNITIES (ISO 9001:2026 Clause 6.1 & 6.2)
  // -------------------------------------------------------------
  appendRoute(prop, 'risk-threats', '/risk-management/threats', 'Risk Assessment & Mitigation', () => import('@/views/risk-management/RiskManagement.vue')),
  appendRoute(prop, 'risk-management-legacy', '/risk/risk-management', 'Risk Management', () => import('@/views/risk-management/RiskManagement.vue')),
  appendRoute(prop, 'add-risk-assessment', '/risk/risk-management/create-new', 'Add Risk Assessment', () => import('@/views/risk-management/AddRiskAssessment.vue')),
  appendRoute(prop, 'view-risk-assessment', '/risk/risk-management/view/:riskId', 'View Risk Assessment', () => import('@/views/risk-management/ViewRiskAssessment.vue')),
  
  appendRoute(prop, 'risk-opportunities', '/risk-management/opportunities', 'Opportunity Register', () => import('@/views/risk-management/OpportunityRegister.vue')),

  appendRoute(prop, 'quality-objective', '/quality-objectives/monitoring', 'Quality Objectives', () => import('@/views/quality-objectives/QualityObjective.vue')),
  appendRoute(prop, 'view-quality-objective', '/quality-objectives/monitoring/view/:objective', 'View Quality Objectives', () => import('@/views/quality-objectives/ViewQualityObjective.vue')),

  // -------------------------------------------------------------
  // 3. DOCUMENT & CHANGE CONTROL (ISO 9001:2026 Clause 6.3 & 7.5)
  // -------------------------------------------------------------
  appendRoute(prop, 'procedure', '/qms/process-forms', 'Process and Forms', () => import('@/views/qms/Procedure.vue')),
  appendRoute(prop, 'version-control', '/qms/version-logs', 'Version Control Logs', () => import('@/views/qms/VersionControl.vue')),
  
  appendRoute(prop, 'approval-workflow', '/qms/approval-workflow', 'Approval Workflow (MOC)', () => import('@/views/qms/ApprovalWorkflow.vue')),
  appendRoute(prop, 'create-amendments', '/qms/approval-workflow/create', 'Create Amendments', () => import('@/views/qms/workflow/components/CreateNewProcedure.vue')),
  appendRoute(prop, 'view-amendments', '/qms/approval-workflow/view/:data', 'View Amendments', () => import('@/views/qms/workflow/components/ViewAmendments.vue')),

  // -------------------------------------------------------------
  // 4. REPORTS & OPERATIONS (ISO 9001:2026 Clause 8)
  // -------------------------------------------------------------
  appendRoute(prop, 'view-workspace', '/reports/workspace', 'My Workspace', () => import('@/views/reports/workspace/Workspace.vue')),
  appendRoute(prop, 'submissions', '/reports/submission', 'Submissions', () => import('@/views/reports/submission/Submission.vue')),
  appendRoute(prop, 'track-submission', '/reports/track-submission', 'Track My Submission', () => import('@/views/reports/track/TrackSubmission.vue')),

  // -------------------------------------------------------------
  // 5. EVALUATION & IMPROVEMENT (ISO 9001:2026 Clause 9 & 10)
  // -------------------------------------------------------------
  appendRoute(prop, 'internal-audits', '/improvement/internal-audits', 'Internal Audit Program', () => import('@/views/improvement/InternalAudits.vue')),
  appendRoute(prop, 'management-review', '/improvement/management-review', 'Management Review', () => import('@/views/improvement/ManagementReview.vue')),
  appendRoute(prop, 'capa-log', '/improvement/capa-log', 'CAPA Log', () => import('@/views/improvement/CapaLog.vue')),

  // -------------------------------------------------------------
  // 6. SYSTEM MANAGEMENT
  // -------------------------------------------------------------
  appendRoute(prop, 'system-account', '/system/account', 'Account Management', () => import('@/views/account-management/AccountManagement.vue')),
  appendRoute(prop, 'account-list-legacy', '/manage/accounts', 'Account List', () => import('@/views/account-management/AccountManagement.vue')),
  appendRoute(prop, 'system-roles', '/system/roles', 'Roles & Permissions', () => import('@/views/system-management/Roles.vue')),
  appendRoute(prop, 'system-departments', '/system/departments', 'Departments', () => import('@/views/system-management/Departments.vue')),
  appendRoute(prop, 'system-form-builder', '/system/form-builder', 'Form Builder', () => import('@/views/form-builder/FormBuilder.vue')),
  appendRoute(prop, 'view-form-builders', '/form-builders/', 'Form Builder Preview', () => import('@/views/form-builder/FormView.vue')),
  appendRoute(prop, 'view-form-builder-legacy', '/form-builder/', 'Form Builder Legacy', () => import('@/views/form-builder/FormBuilder.vue'))
];

const EmployeeRoutes = {
  path: '/',
  redirect: '/dashboard',
  name: 'admin-layout',
  meta: {
    requiresAuth: true
  },
  component: () => import('@/layouts/dashboard/DashboardLayout.vue'),
  children: adminRoute('employee-layout')
};

export default EmployeeRoutes;