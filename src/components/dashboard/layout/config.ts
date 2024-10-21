import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'user' },
  { key: 'app-layout', title: 'App Layout', href: paths.dashboard.app_layout, icon: 'chart-pie' },
  { key: 'carousel', title: 'Image Gallery', href: paths.dashboard.carousel, icon: 'gallery' },
  { key: 'history', title: 'History', href: paths.dashboard.history, icon: 'history' },
  { key: 'directory', title: 'Directory', href: paths.dashboard.directory, icon: 'plugs-connected' },
  { key: 'forms', title: 'Forms', href: paths.dashboard.forms, icon: 'plugs-connected' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
] satisfies NavItemConfig[];
