import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import { FormErrorMessages } from './form-error-messages';

@Pipe({
  name: 'formError'
})
export class FormErrorPipe implements PipeTransform {

  transform(value: any, args?: any): string {
    let msg = this.getErrorMessage(args['control'], args['schemaName'], args['fieldName']);
    console.log(msg + '-pipe called');
    return msg;
  }

  getErrorMessage(control: FormControl, schemaName: string, fieldName: string): string {
    let formControlEl = document.body.querySelectorAll('[formControlName=' + fieldName + ']');
    let FormGroupEl = (formControlEl && formControlEl[0]) ? this.findParentByClass(formControlEl[0], 'form-group') : null;

    if (!control.valid) {
      const messages = FormErrorMessages[schemaName][fieldName];
      let fieldMessage = '';
      console.log(control.errors);
      _.forEach(control.errors, (error, errorName) => {
        try {
          if (!messages[errorName]) {
            throw error;
          }
          fieldMessage += messages[errorName] + ' ';
          if (errorName === 'required') {
            return false;
          }
        } catch (error) {
          console.log('Add error message for "' + errorName + '"');
        }
      });
      if (FormGroupEl) { (FormGroupEl.classList.add('has-error')); }
      return fieldMessage;
    } else {
      if (FormGroupEl) { (FormGroupEl.classList.remove('has-error')); }
      return '';
    }
  }

  findParentByClass(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls)) { }
    return el;
  }
}
