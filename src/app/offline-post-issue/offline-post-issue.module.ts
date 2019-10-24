import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OfflinePostIssuePage } from './offline-post-issue.page';

const routes: Routes = [
  {
    path: '',
    component: OfflinePostIssuePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OfflinePostIssuePage]
})
export class OfflinePostIssuePageModule {}
