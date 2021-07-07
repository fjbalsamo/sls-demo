import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { name } = event.body;
  const response = {
    message: `Hello ${name}!`,
  };
  return formatJSONResponse({
    response,
    statusCode: 200,
  });
};

export const main = middyfy(hello);
