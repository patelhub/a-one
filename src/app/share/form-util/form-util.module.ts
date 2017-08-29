import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorContainerComponent } from './form-error-container/form-error-container.component';
import { FormErrorPipe } from './form-error.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FormErrorContainerComponent, FormErrorPipe],
  exports: [FormErrorContainerComponent, FormErrorPipe]
})
export class FormUtilModule { }
