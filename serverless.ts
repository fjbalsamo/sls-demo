import type { AWS } from "@serverless/typescript";
import dynamodb from "src/dynamoDB/custom";
import dynamoTables from "src/dynamoDB/resources";
import dynamoIam from "src/dynamoDB/provider";
import hello from "@functions/hello";
import users from "@functions/users";

const serverlessConfiguration: AWS = {
  useDotenv: true,
  service: "sls-demo",
  frameworkVersion: "2",
  custom: {
    dynamodb,
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
    users,
  },
  resources: {
    Resources: dynamoTables,
  },
};

module.exports = serverlessConfiguration;
