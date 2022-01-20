import { Validation } from '../../../presentation/protocols/Validation';
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter';
import { EmailValidation } from '../../../validation/email-validation';
import { RequiredFieldsValidation } from '../../../validation/required-fields-validation';
import { ValidationComposite } from '../../../validation/validation-composite';

export const makeLoginValidation = (): Validation => {
  const fields = ['email', 'password'];
  const validations: Validation[] = [];

  for (const field of fields) {
    validations.push(new RequiredFieldsValidation(field));
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));

  return new ValidationComposite(validations);
};