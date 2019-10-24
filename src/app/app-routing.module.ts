import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegComponent } from './reg/reg.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
path:'reg/:loca/:time/:date',
component:RegComponent
  },
  // {
  //   path:'register/:imagePreview/:issueDate/:location/:offenceCategory',
  //   component:RegisterPage
  //     },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'home-screen', loadChildren: './home-screen/home-screen.module#HomeScreenPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'offline-post-issue', loadChildren: './offline-post-issue/offline-post-issue.module#OfflinePostIssuePageModule' },
  // { path: 'dashboard',canActivate: [AuthGuard], loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
   { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },

  { path: 'post-scenario', loadChildren: './post-scenario/post-scenario.module#PostScenarioPageModule' },
  { path: 'login-reward', loadChildren: './login-reward/login-reward.module#LoginRewardPageModule' },
  { path: 'view-issue', loadChildren: './view-issue/view-issue.module#ViewIssuePageModule' },
  { path: 'pending-reports', loadChildren: './view-issue/pending-reports/pending-reports.module#PendingReportsPageModule' },
  { path: 'get-all-reports', loadChildren: './view-issue/get-all-reports/get-all-reports.module#GetAllReportsPageModule' },
  { path: 'rejected-reports', loadChildren: './view-issue/rejected-reports/rejected-reports.module#RejectedReportsPageModule' },
  { path: 'approved-reports', loadChildren: './view-issue/approved-reports/approved-reports.module#ApprovedReportsPageModule' },
  { path: 'reward-points', loadChildren: './reward-points/reward-points.module#RewardPointsPageModule' },
  { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule' },
 
  { path: '**', loadChildren: './not-found/not-found.module#NotFoundPageModule' },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
