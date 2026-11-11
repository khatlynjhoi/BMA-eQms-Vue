import type { RouteRecordRaw } from 'vue-router';

const MainRoutes: RouteRecordRaw = {
  path: '/',
  component: () => import('@/layouts/dashboard/DashboardLayout.vue'),
  meta: {
    requiresAuth: true
  },
  children: [
    {
      path: '',
      redirect: '/dashboard'
    },
    {
      name: 'Dashboard',
      path: 'dashboard',
      component: () => import('@/views/dashboards/employee/Dashboard.vue'),
      meta: { title: 'Executive Dashboard — BMA e-QMS' }
    },

    /* Clause 4: Context of the Organization */
    {
      name: 'ContextClimate',
      path: 'context/climate',
      component: () => import('@/views/context/ClimateAssessment.vue'),
      meta: { title: 'Climate & Operational Context (Clause 4.1)' }
    },
    {
      name: 'InterestedParties',
      path: 'context/interested-parties',
      alias: ['context/stakeholders'],
      component: () => import('@/views/context/Stakeholders.vue'),
      meta: { title: 'Interested Parties Register (Clause 4.2)' }
    },
    {
      name: 'QualityPolicy',
      path: 'context/quality-policy',
      alias: ['context/policy-culture'],
      component: () => import('@/views/context/QualityCulture.vue'),
      meta: { title: 'Quality Policy & Ethics Culture (Clause 5.2)' }
    },

    /* Clause 5: Leadership, Roles & Departments */
    {
      name: 'AccountManagement',
      path: 'account-management',
      component: () => import('@/views/account-management/AccountManagement.vue'),
      meta: { title: 'Account Management (Clause 5.3 & 7.2)' }
    },
    {
      name: 'RolesManagement',
      path: 'system/roles',
      component: () => import('@/views/system-management/Roles.vue'),
      meta: { title: 'QMS Roles & Authority Matrix (Clause 5.3)' }
    },
    {
      name: 'DepartmentsManagement',
      path: 'system/departments',
      component: () => import('@/views/system-management/Departments.vue'),
      meta: { title: 'Departmental Structure (Clause 5.3)' }
    },

    /* Clause 6: Planning, Risks & Quality Objectives */
    {
      name: 'RiskManagement',
      path: 'risk-management',
      alias: ['risk/risk-management'],
      component: () => import('@/views/risk-management/RiskManagement.vue'),
      meta: { title: 'Risk Register Workspace (Clause 6.1)' }
    },
    {
      name: 'AddRiskAssessment',
      path: 'risk-management/create-new',
      alias: ['risk/risk-management/create-new'],
      component: () => import('@/views/risk-management/AddRiskAssessment.vue'),
      meta: { title: 'New Risk Assessment (Clause 6.1)' }
    },
    {
      name: 'ViewRiskAssessment',
      path: 'risk-management/view/:id',
      alias: ['risk/risk-management/view/:id'],
      component: () => import('@/views/risk-management/ViewRiskAssessment.vue'),
      meta: { title: 'View Risk Assessment (Clause 6.1)' }
    },
    {
      name: 'OpportunityRegister',
      path: 'risk-management/opportunities',
      alias: ['risk/opportunity-register'],
      component: () => import('@/views/risk-management/OpportunityRegister.vue'),
      meta: { title: 'Opportunity Register (Clause 6.1)' }
    },
    {
      name: 'QualityObjectives',
      path: 'quality-objectives',
      component: () => import('@/views/quality-objectives/QualityObjective.vue'),
      meta: { title: 'Quality Objectives (Clause 6.2)' }
    },

    /* Clause 7 & 8: Support, Documented Information & Operations */
    {
      name: 'DocumentedInformation',
      path: 'documents',
      component: () => import('@/views/reports/workspace/Workspace.vue'),
      meta: { title: 'Documented Information (Clause 7.5)' }
    },
    {
      name: 'DocumentAmendment',
      path: 'documents/amendment',
      component: () => import('@/views/reports/submission/Submission.vue'),
      meta: { title: 'Management of Change (MOC) (Clause 7.5.3)' }
    },
    {
      name: 'KnowledgeBank',
      path: 'documents/knowledge-bank',
      component: () => import('@/views/reports/track/TrackSubmission.vue'),
      meta: { title: 'Organizational Knowledge (Clause 7.1.6)' }
    },
    {
      name: 'OperationsResilience',
      path: 'operations/resilience',
      component: () => import('@/views/quality-objectives/QualityObjective.vue'),
      meta: { title: 'Operations & Resilience (Clause 8.1)' }
    },
    {
      name: 'FormBuilderStudio',
      path: 'form-builder',
      component: () => import('@/views/form-builder/FormBuilder.vue'),
      meta: { title: 'Form Builder Studio (Clause 7.5.3)' }
    },
    {
      name: 'ReportsWorkspace',
      path: 'reports/workspace',
      component: () => import('@/views/reports/workspace/Workspace.vue'),
      meta: { title: 'Form Requests Workspace (Clause 7.5)' }
    },
    {
      name: 'ReportsSubmissions',
      path: 'reports/submissions',
      component: () => import('@/views/reports/submission/Submission.vue'),
      meta: { title: 'Submissions Directory (Clause 7.5.3)' }
    },
    {
      name: 'TrackSubmissions',
      path: 'reports/track-submission',
      component: () => import('@/views/reports/track/TrackSubmission.vue'),
      meta: { title: 'Submission Routing Tracker (Clause 7.5.3)' }
    },

    /* Clause 9 & 10: Performance Evaluation & Continual Improvement */
    {
      name: 'CapaLog',
      path: 'improvement/capa',
      alias: ['capa'],
      component: () => import('@/views/improvement/CapaLog.vue'),
      meta: { title: 'CAPA Log (Clause 10.2)' }
    },
    {
      name: 'InternalAudits',
      path: 'improvement/internal-audits',
      alias: ['audits'],
      component: () => import('@/views/improvement/InternalAudits.vue'),
      meta: { title: 'Internal Audits (Clause 9.2)' }
    },
    {
      name: 'ManagementReview',
      path: 'improvement/management-review',
      component: () => import('@/views/improvement/ManagementReview.vue'),
      meta: { title: 'Management Review (Clause 9.3)' }
    },

    /* Design System Utilities */
    {
      name: 'ColorPalette',
      path: 'utilities/colors',
      component: () => import('@/views/utilities/colors/ColorPage.vue'),
      meta: { title: 'Theme Colors — UI Reference' }
    },
    {
      name: 'ShadowsPage',
      path: 'utilities/shadows',
      component: () => import('@/views/utilities/shadows/ShadowPage.vue'),
      meta: { title: 'Shadow Elevation — UI Reference' }
    },
    {
      name: 'TypographyPage',
      path: 'utilities/typography',
      component: () => import('@/views/utilities/typography/TypographyPage.vue'),
      meta: { title: 'Typography Scale — UI Reference' }
    }
  ]
};

export default MainRoutes;