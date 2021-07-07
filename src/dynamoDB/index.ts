import * as AWS from "aws-sdk";

AWS.config.update({ region: process.env.REGION });
const documentClient = new AWS.DynamoDB.DocumentClient();

export const USERS_TABLE = `${process.env.STAGE}_UsersTable`;
export const POSTS_TABLE = `${process.env.STAGE}_PostsTable`;

// Put
type PutItemInput = AWS.DynamoDB.DocumentClient.PutItemInput;
type PutItemOutput = AWS.DynamoDB.DocumentClient.PutItemOutput;

// Batch write
type BatchWriteItemInput = AWS.DynamoDB.DocumentClient.BatchWriteItemInput;
type BatchWriteItemOutput = AWS.DynamoDB.DocumentClient.BatchWriteItemOutput;

// Update
type UpdateItemInput = AWS.DynamoDB.DocumentClient.UpdateItemInput;
type UpdateItemOutPut = AWS.DynamoDB.DocumentClient.UpdateItemOutput;

// Query
type QueryInput = AWS.DynamoDB.DocumentClient.QueryInput;
type QueryOutput = AWS.DynamoDB.DocumentClient.QueryOutput;

// Get
type GetItemInput = AWS.DynamoDB.DocumentClient.GetItemInput;
type GetItemOutput = AWS.DynamoDB.DocumentClient.GetItemOutput;

// Delete
type DeleteItemInput = AWS.DynamoDB.DocumentClient.DeleteItemInput;
type DeleteItemOutput = AWS.DynamoDB.DocumentClient.DeleteItemOutput;

export default class DatabaseService {
  async save(params: PutItemInput): Promise<PutItemOutput> {
    return await documentClient.put(params).promise();
  }

  async saveBatch(params: BatchWriteItemInput):Promise<BatchWriteItemOutput> {
      return await documentClient.batchWrite(params).promise();
  }

  async update(params:UpdateItemInput):Promise<UpdateItemOutPut> {
      return await documentClient.update(params).promise();
  }

  async find(params:QueryInput):Promise<QueryOutput> {
      return await documentClient.query(params).promise();
  }

  async findOne(params:GetItemInput):Promise<GetItemOutput> {
      return await documentClient.get(params).promise();
  }

  async delete(params: DeleteItemInput): Promise<DeleteItemOutput> {
      return await documentClient.delete(params).promise();
  }

  
}
