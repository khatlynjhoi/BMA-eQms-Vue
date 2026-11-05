export interface menu {
  header?: string;
  title?: string;
  icon?: string;
  to?: string;
  divider?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  // -------------------------------------------------------------
  // DASHBOARD
  // -------------------------------------------------------------
  { header: 'Dashboard' },
  {
    title: 'Dashboard',
    icon: 'custom-home-outline',
    to: '/dashboard'
  },

  // -------------------------------------------------------------
  // CONTEXT & GOVERNANCE (Clause 4 & Clause 5)
  // -------------------------------------------------------------
  { header: 'Context & Governance' },
  {
    title: 'Context & Climate',
    icon: 'custom-globe-outline',
    to: '/context/climate',
    chip: '2026',
    chipColor: 'primary',
    chipVariant: 'tonal'
  },
  {
    title: 'Interested Parties',
    icon: 'custom-users-outline',
    to: '/context/stakeholders',
    chip: '2026',
    chipColor: 'primary',
    chipVariant: 'tonal'
  },
  {
    title: 'Quality Policy & Ethics',
    icon: 'custom-shield-outline',
    to: '/context/policy-culture',
    chip: '2026',
    chipColor: 'primary',
    chipVariant: 'tonal'
  },

  // -------------------------------------------------------------
  // RISK & OPPORTUNITIES (Clause 6.1 & Clause 6.2)
  // -------------------------------------------------------------
  { header: 'Risk & Opportunities' },
  {
    title: 'Risk Management',
    icon: 'custom-warning-outline',
    children: [
      {
        title: 'Risk Assessment',
        to: '/risk-management/threats'
      },
      {
        title: 'Opportunity Register',
        to: '/risk-management/opportunities',
        chip: '2026',
        chipColor: 'primary',
        chipVariant: 'tonal'
      }
    ]
  },
  {
    title: 'Quality Objectives',
    icon: 'custom-target-outline',
    to: '/quality-objectives/monitoring'
  },

  // -------------------------------------------------------------
  // DOCUMENT & CHANGE CONTROL (Clause 6.3 & Clause 7.5)
  // -------------------------------------------------------------
  { header: 'Document & Change Control' },
  {
    title: 'Process & Forms',
    icon: 'custom-document-text-outline',
    to: '/qms/process-forms'
  },
  {
    title: 'Version Control Logs',
    icon: 'custom-history-outline',
    to: '/qms/version-logs'
  },
  {
    title: 'Approval Workflow (MOC)',
    icon: 'custom-git-fork-outline',
    to: '/qms/approval-workflow',
    subCaption: 'Management of Change'
  },

  // -------------------------------------------------------------
  // REPORTS & OPERATIONS (Clause 8)
  // -------------------------------------------------------------
  { header: 'Reports & Operations' },
  {
    title: 'Workspace',
    icon: 'custom-briefcase-outline',
    to: '/reports/workspace'
  },
  {
    title: 'Submissions',
    icon: 'custom-send-outline',
    to: '/reports/submission'
  },
  {
    title: 'Track My Submission',
    icon: 'custom-search-outline',
    to: '/reports/track-submission'
  },

  // -------------------------------------------------------------
  // EVALUATION & IMPROVEMENT (Clause 9 & Clause 10)
  // -------------------------------------------------------------
  { header: 'Evaluation & Improvement' },
  {
    title: 'Internal Audit Program',
    icon: 'custom-clipboard-outline',
    to: '/improvement/internal-audits',
    chip: '2026',
    chipColor: 'primary',
    chipVariant: 'tonal'
  },
  {
    title: 'Management Review',
    icon: 'custom-presentation-outline',
    to: '/improvement/management-review',
    chip: '2026',
    chipColor: 'primary',
    chipVariant: 'tonal'
  },
  {
    title: 'CAPA Log',
    icon: 'custom-refresh-outline',
    to: '/improvement/capa-log',
    chip: '2026',
    chipColor: 'primary',
    chipVariant: 'tonal'
  },

  // -------------------------------------------------------------
  // SYSTEM MANAGEMENT
  // -------------------------------------------------------------
  { header: 'System Management' },
  {
    title: 'Account',
    icon: 'custom-user-outline',
    to: '/system/account'
  },
  {
    title: 'Roles',
    icon: 'custom-key-outline',
    to: '/system/roles'
  },
  {
    title: 'Departments',
    icon: 'custom-building-outline',
    to: '/system/departments'
  },
  {
    title: 'Form Builder',
    icon: 'custom-wrench-outline',
    to: '/system/form-builder'
  }
];

export default sidebarItem;