import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'ad-page/:id',
    loadComponent: () => import('./pages/ad-page/ad-page.page').then( m => m.AdPagePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'create-ad',
    loadComponent: () => import('./pages/create-ad/create-ad.page').then( m => m.CreateAdPage)
  },
  {
    path: 'bookmarked-ads',
    loadComponent: () => import('./pages/bookmarked-ads/bookmarked-ads.page').then( m => m.BookmarkedAdsPage)
  },
];
