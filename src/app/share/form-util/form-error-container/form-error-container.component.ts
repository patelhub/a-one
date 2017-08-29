import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-error-container',
  template: `
  <div class="text-danger" *ngIf="control && control.dirty">
    {{ control.value | formError: fieldMeta }}
  </div>`,
  styleUrls: ['./form-error-container.component.scss']
})
export class FormErrorContainerComponent implements OnInit {

  control: AbstractControl;
  @Input() formGroup: FormGroup;
  @Input() errorFor: string = '';

  fieldMeta: any = {};
  errors: any = {};

  constructor(private errorContainer: ElementRef) { }

  ngOnInit() {
    if (this.formGroup) {
      this.control = this.formGroup.get(this.errorFor);
      this.fieldMeta['schemaName'] = this.findParentForm(this.errorContainer.nativeElement).getAttribute('schemaName');
      this.fieldMeta['control'] = this.control;
      this.fieldMeta['fieldName'] = this.errorFor;
    }
  }

  findParentForm(el): Element {
    while ((el = el.parentElement)) {
      if (el.tagName.toLowerCase() === 'form') {
        break;
      }
    }
    return el;
  }

}
