import {POSTS_TABLE, USERS_TABLE} from '../dynamoDB';

export default {
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
    { "Fn::GetAtt": [USERS_TABLE, "Arn"] },
    { "Fn::GetAtt": [POSTS_TABLE, "Arn"] },
  ],
};
