import { POSTS_TABLE, USERS_TABLE } from "../dynamoDB";

export default {
  UsersTable: {
    Type: "AWS::DynamoDB::Table",
    DeletionPolicy: "Retain",
    Properties: {
      TableName: USERS_TABLE,
      DeletionPolicy: "Retain",
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    },
  },
  PostsTable: {
    Type: "AWS::DynamoDB::Table",
    DeletionPolicy: "Retain",
    Properties: {
      TableName: POSTS_TABLE,
      DeletionPolicy: "Retain",
      AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" },
        { AttributeName: "userId", AttributeType: "S" },
      ],
      KeySchema: [
        { AttributeName: "id", KeyType: "HASH" },
        { AttributeName: "userId", KeyType: "RANGE" },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: "user_index",
          KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
          Projection: {
            ProjectionType: "ALL",
          },
        },
      ],
    },
  },
};
