export const dynamoTables = {
  UsersTable: {
    Type: "AWS::DynamoDB::Table",
    DeletionPolicy: "Retain",
    Properties: {
      TableName: "UsersTable",
      DeletionPolicy: 'Retain',
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    },
  },
} as const;

export const dynamoIAMRoleStatements = [
  {
    Effect: "Allow",
    Action: [
      "dynamodb:DescribeTable",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
    ],
    Resource: [
      { "Fn::GetAtt": ["usersTable", "Arn"] },
      // { "Fn::GetAtt": ["TasksTable", "Arn"] },
    ],
  },
];
