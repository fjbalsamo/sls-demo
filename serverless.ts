import type { AWS } from "@serverless/typescript";
import dynamoTables from "src/resources/dynamo.tables";
import dynamoIam from "src/providers/dynamo.iam";
import hello from "@functions/hello";

const serverlessConfiguration: AWS = {
  useDotenv: true,
  service: "sls-demo",
  frameworkVersion: "2",
  custom: {
    dynamodb: {
      stages: ["dev"],
      start: {
        port: 8000,
        inMemory: true,
        heapInitial: "200m",
        heapMax: "1g",
        migrate: true,
        // seed: true,
        convertEmptyValues: true,
      },
    },
    region: "${env:REGION}",
    stage: "${env:STAGE}",
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
    ["serverless-offline"]: {
      httpPort: 4000,
      babelOptions: {
        presets: ["env"],
      },
    },
  },
  plugins: [
    "serverless-webpack",
    "serverless-dynamodb-local",
    "serverless-offline",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    lambdaHashingVersion: "20201221",
    iamRoleStatements: [dynamoIam],
  },
  package: {
    individually: true,
  },
  // import the function via paths
  functions: {
    hello,
  },
  resources: {
    Resources: dynamoTables,
  },
};

module.exports = serverlessConfiguration;
