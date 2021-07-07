import Db, { USERS_TABLE } from "../../dynamoDB";
import { IUserDTO } from "./users.interfaces";
import { v4 as uuid } from "uuid";
const db = new Db();

export const createUser = async ({ email, name }: IUserDTO) => {
  return await db.save({
    TableName: USERS_TABLE,
    Item: {
      email,
      name,
      id: uuid(),
      createdAt: Date.now(),
    },
  });
};

export const updateUser = async ({ id, email, name }: IUserDTO) => {
  return await db.update({
    TableName: USERS_TABLE,
    Key: { id },
    UpdateExpression:
      "set #name = :name, #email = :email, #updatedAt: :updated",
    ExpressionAttributeValues: {
      ":name": name,
      ":email": email,
      ":updated": Date.now(),
    },
  });
};

export const getUserByID = async (id: string) => {
  return await db.findOne({
    Key: { id },
    TableName: USERS_TABLE,
  });
};

export const getUsersByName = async (name: string) => {
    return await db.find({
        TableName: USERS_TABLE,
        KeyConditionExpression: "name = :name",
        ExpressionAttributeValues: {
            ":name": name,
        }
    })
}
