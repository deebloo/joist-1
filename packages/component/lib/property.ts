import { PropChange } from './lifecycle';

export interface PropValidationError {
  message?: string;
}

export type PropValidator = (val: any) => null | PropValidationError;

function createValidator(validator: PropValidator, key: string) {
  return function (val: any) {
    const res = validator(val);

    if (res !== null) {
      throw new Error(
        `Validation failed when assigning ${val} to key ${key}.${
          res.message ? ' ' + res.message : ''
        }`
      );
    }
  };
}

export function property(...validatorFns: PropValidator[]) {
  return function (target: any, key: string) {
    const valueKey = `__prop__${key}__value`;
    const initKey = `__prop__${key}__initialized`;
    const validators = validatorFns.map((v) => createValidator(v, key));

    Object.defineProperty(target, key, {
      set(val) {
        if (validators.length) {
          validators.forEach((validator) => {
            validator(val);
          });
        }

        if (this.onPropChanges) {
          const oldValue = this[key];

          if (val !== oldValue) {
            this[valueKey] = val;

            this.onPropChanges(new PropChange(key, val, !this[initKey], oldValue));
          }
        }

        this[initKey] = true;
      },
      get() {
        return this[valueKey];
      },
      configurable: true,
      enumerable: true,
    });
  };
}
