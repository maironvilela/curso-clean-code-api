import { MissingParamError, InvalidParamError, ServerError } from '../../error';
import {
  badRequest,
  internalServerError,
  ok,
} from '../../helpers/http-helpers';

import {
  AddAccount,
  controllers,
  EmailValidator,
  HttpRequest,
  HttpResponse,
} from './signup-protocols';

export class SignUpController implements controllers {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password, passwordConfirmation } = request.body;
      const fieldsRequired = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];

      for (const field of fieldsRequired) {
        if (!request.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const isEmailValid = this.emailValidator.validate(email);

      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'));
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const account = await this.addAccount.add({
        name,
        email,
        password,
      });
      return ok(account);
    } catch (err) {
      return internalServerError(new ServerError());
    }
  }
}