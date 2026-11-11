export interface menu {
  header?: string;
  title?: string;
  icon?: string;
  to?: string;
  chip?: string;
  chipColor?: string;
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: 'DASHBOARD & OVERVIEW' },
  {
    title: 'Executive Dashboard',
    icon: 'layout-dashboard-icon',
    to: '/dashboard'
  },

  { header: 'CLAUSE 4 & 5: CONTEXT & GOVERNANCE' },
  {
    title: 'Context & Climate Assessment',
    icon: 'world-icon',
    to: '/context/climate',
    chip: '2026',
    chipColor: 'info'
  },
  {
    title: 'Interested Parties Register',
    icon: 'users-icon',
    to: '/context/interested-parties',
    chip: '2026',
    chipColor: 'info'
  },
  {
    title: 'Quality Policy & Ethics',
    icon: 'shield-check-icon',
    to: '/context/quality-policy',
    chip: '2026',
    chipColor: 'info'
  },

  { header: 'CLAUSE 6: PLANNING, RISKS & CHANGE' },
  {
    title: 'Risk Management Workspace',
    icon: 'alert-triangle-icon',
    to: '/risk-management'
  },
  {
    title: 'Opportunity Register',
    icon: 'bulb-icon',
    to: '/risk-management/opportunities',
    chip: 'New',
    chipColor: 'success'
  },
  {
    title: 'Quality Objectives',
    icon: 'target-icon',
    to: '/quality-objectives'
  },

  { header: 'CLAUSE 7: SUPPORT & KNOWLEDGE' },
  {
    title: 'Documented Information',
    icon: 'file-text-icon',
    to: '/documents'
  },
  {
    title: 'Management of Change (MOC)',
    icon: 'file-diff-icon',
    to: '/documents/amendment'
  },
  {
    title: 'Organizational Knowledge',
    icon: 'book-icon',
    to: '/documents/knowledge-bank',
    chip: '2026',
    chipColor: 'info'
  },

  { header: 'CLAUSE 8: OPERATIONS & RESILIENCE' },
  {
    title: 'Operations & Resilience',
    icon: 'shield-lock-icon',
    to: '/operations/resilience'
  },

  { header: 'CLAUSE 9 & 10: AUDITS & CAPA' },
  {
    title: 'Internal Audits',
    icon: 'clipboard-check-icon',
    to: '/audits'
  },
  {
    title: 'CAPA Log',
    icon: 'alert-circle-icon',
    to: '/capa'
  }
];

export default sidebarItem;