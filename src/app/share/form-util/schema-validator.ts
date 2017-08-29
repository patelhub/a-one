import { ValidatorFn, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import * as Ajv from 'ajv';

export class SchemaValidator {

  private static ajv = new Ajv({ allErrors: true });
  private static schema = null;
  private static compiledValidate = null;

  /**
   * Return compiled ajv validate object for schema.
   */
  private static get(schema) {
    if (schema !== SchemaValidator.schema) {
      SchemaValidator.schema = schema;
      let schemaCopy = Object.assign({}, schema);
      delete schemaCopy['required'];
      SchemaValidator.compiledValidate = SchemaValidator.ajv.compile(schemaCopy);
      schemaCopy = null;
    }
    return SchemaValidator.compiledValidate;
  }

  /**
 * Validator that requires controls to have a value as schema.
 * @method schemaField
 * @param {JSON} schema
 * @param {String} fieldName
 * @return {JSON}
 */
  static validate(schema: any, fieldName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!schema.properties[fieldName]) { return null; }
      const data = {};
      data[fieldName] = control.value;
      const validate = SchemaValidator.get(schema),
        valid = validate(data);
      if (!valid) {
        const errorList = {};
        _.forEach(validate.errors, (error) => {
          errorList[error.keyword] = { error: error, schema: schema.properties[fieldName] }; // this detail can be useful for error message
        });
        return errorList;
      }
      return null;
    };
  }

}
