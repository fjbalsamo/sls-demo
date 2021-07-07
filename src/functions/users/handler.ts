import "source-map-support/register";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { createUser } from "./users.service";
import { newUserSchema } from "./schema";

const create: ValidatedEventAPIGatewayProxyEvent<typeof newUserSchema> = async (
  event
) => {
  const { name, email } = event.body;
  try {
    const newUser = await createUser({ email, name });
    return formatJSONResponse({
      response: {
        message: "user created",
        user: newUser,
      },
      statusCode: 201,
    });
  } catch (error) {
    return formatJSONResponse({
      response: {
        message: "error trying created an user",
        error,
      },
      statusCode: 500,
    });
  }
};

export const createUserLambda = middyfy(create);
