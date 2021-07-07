import {newUserSchema} from './schema';
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.createUserLambda`,
  events: [
    {
      http: {
        method: 'post',
        path: 'newUser',
        request: {
          schema: {
            'application/json': newUserSchema
          }
        },
        cors: true,
      }
    }
  ]
};
