import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, "body"> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

type StatusCode =
  | 200 // ok
  | 201 // created
  | 202 // ok - in proccess
  | 204 // ok - without response
  | 205 // ok - refresh customer content
  | 400 // bad request
  | 401 // not authorized
  | 403 // forbbiden
  | 404 // not found
  | 409 // conflict
  | 500; // internal server error

export interface IFormatJSONResponse {
  response: Record<string, unknown>;
  statusCode?: StatusCode;
}

export const formatJSONResponse = ({
  response,
  statusCode = 200,
}: IFormatJSONResponse) => {
  return {
    statusCode,
    body: JSON.stringify(response),
  };
};
