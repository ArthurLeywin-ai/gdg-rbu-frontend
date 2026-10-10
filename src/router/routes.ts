export type AppRoute = '/' | '/events' | '/gallery' | '/team' | '/portfolio' | '/more';

export interface RouteMeta {
  path: AppRoute;
  label: string;
  loadingLabel: string;
  documentTitle: string;
}

export const ROUTES: Record<AppRoute, RouteMeta> = {
  '/': {
    path: '/',
    label: 'Home',
    loadingLabel: 'Loading Home...',
    documentTitle: 'GDG RBU — Google Developer Groups On Campus',
  },
  '/events': {
    path: '/events',
    label: 'Events',
    loadingLabel: 'Loading Events...',
    documentTitle: 'Events & Workshops — GDG RBU',
  },
  '/gallery': {
    path: '/gallery',
    label: 'Gallery',
    loadingLabel: 'Loading Gallery...',
    documentTitle: 'Chapter Gallery — GDG RBU',
  },
  '/team': {
    path: '/team',
    label: 'Team',
    loadingLabel: 'Loading Team...',
    documentTitle: 'Meet the Team — GDG RBU',
  },
  '/portfolio': {
    path: '/portfolio',
    label: 'Portfolio',
    loadingLabel: 'Loading Portfolio...',
    documentTitle: 'Projects & Portfolio — GDG RBU',
  },
  '/more': {
    path: '/more',
    label: 'More',
    loadingLabel: 'Loading More...',
    documentTitle: 'Resources & Information — GDG RBU',
  },
};

export const normalizePath = (rawPath: string): AppRoute => {
  // Normalize pathname: remove trailing slash unless it's just '/'
  let clean = rawPath.trim().toLowerCase();
  if (clean.length > 1 && clean.endsWith('/')) {
    clean = clean.slice(0, -1);
  }
  if (clean in ROUTES) {
    return clean as AppRoute;
  }
  return '/';
};
