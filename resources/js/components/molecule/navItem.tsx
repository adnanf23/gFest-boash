// NavItems.ts

// Interface untuk setiap item navigasi
export interface NavItem {
  icon: string; // Placeholder untuk nama icon (misalnya dari Heroicons/Lucide)
  label: string;
  link: string;
  badge?: number;
  active?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { icon: 'OverviewIcon', label: 'Overview', link: '#overview', active: true },
  { icon: 'ReportIcon', label: 'Report', link: '#report' },
  { icon: 'LeadIcon', label: 'Lead', link: '#lead' },
  { icon: 'RevenueIcon', label: 'Revenue', link: '#revenue' },
  { icon: 'MarketingIcon', label: 'Marketing', link: '#marketing' },
  { icon: 'OpportunitiesIcon', label: 'Opportunities', link: '#opportunities' },
  { icon: 'TaskIcon', label: 'Task', link: '#task' },
  { icon: 'ContactsIcon', label: 'Contacts', link: '#contacts' },
  { icon: 'HelpCenterIcon', label: 'Help Center', link: '#help', badge: 4 },
  { icon: 'SettingsIcon', label: 'Settings', link: '#settings', badge: 1 },
];
