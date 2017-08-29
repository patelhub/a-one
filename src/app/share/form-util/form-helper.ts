import { AppInjector } from '../../app.module';
import { FormBuilder, FormGroup, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { SchemaValidator } from './schema-validator';
import * as _ from 'lodash';

export namespace FormHelper {

  // let fb: FormBuilder = AppInjector.get(FormBuilder);
  let fb: FormBuilder = new FormBuilder();

  /**
   * Create FormBuilder using JSON Schema
   * @method build
   * @param any schema JSON Schema
   */
  export function build(schema: any, options = {}): FormGroup {

    var schemaField = schema.properties;
    // if (options['exclude']) {
    //   _.pull(schemaField, options['exclude'])
    // }

    const formGroup: FormGroup = new FormGroup({});
    if (schemaField) {
      delete schema.properties.id;
      let validatorArr: Array<ValidatorFn> = null,
        defaultValue: any = null;
      _.forEach(schemaField, (property, key) => {
        validatorArr = [];
        if (schema.required && schema.required.indexOf(key) !== -1) {
          validatorArr.push(Validators.required);
        }
        validatorArr.push(SchemaValidator.validate(schema, key));

        if (property.default) {
          defaultValue = property.default;
        } else {
          defaultValue = _getDefaultBySchemaType(property.type);
        }

        formGroup.addControl(key, new FormControl(defaultValue, validatorArr));
      });
    }

    return formGroup;
  }

  function _getDefaultBySchemaType(type) {
    let value: any;
    switch (type) {
      case 'boolean':
        value = false;
        break;
      default:
        value = '';
        break;

    }
    return value;
  }

}
