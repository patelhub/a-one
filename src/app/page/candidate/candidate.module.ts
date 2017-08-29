import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateComponent } from './candidate.component';
import { RouterModule, Routes } from '@angular/router';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormUtilModule } from '../../share/form-util/form-util.module';

const routes: Routes = [
  {
    path: '',
    component: CandidateComponent,
  },
  {
    path: 'form',
    component: CandidateFormComponent,
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormUtilModule
  ],
  declarations: [CandidateComponent, CandidateFormComponent]
})
export class CandidateModule { }

