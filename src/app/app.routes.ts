import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard'; // Adjust path
import { AnalyticsComponent } from './pages/analytics/analytics';
import { UsersComponent } from './pages/users/users';
import { SettingsComponent } from './pages/settings/settings';
import { AdminBillingComponent } from './pages/admin-billing/admin-billing';
// import { AnalyticsComponent } from './pages/analytics/analytics';

export const routes: Routes = [
    { path: '', component: DashboardComponent }, // This fills the empty outlet at launch
    { path: 'dashboard', redirectTo: '', pathMatch: 'full' },
    { path: 'analytics', component: AnalyticsComponent },
    { path: 'users', component: UsersComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'admin-billing', component: AdminBillingComponent },
    // { path: 'analytics', component: AnalyticsComponent },
    // { path: 'users', component: UsersComponent },
];