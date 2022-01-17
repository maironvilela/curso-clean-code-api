import { ServerError } from '../error';
import { HttpResponse } from '../protocols/http';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const internalServerError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack ?? ''),
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const create = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});
