import 'dotenv/config';
import * as cdk from 'aws-cdk-lib';

import { CartServiceStack } from './cart-service.stack';

const app = new cdk.App();

new CartServiceStack(
  app,
  'cart-service-stack',
  {
    dbHost: process.env.DB_HOST || '',
    dbPort: process.env.DB_PORT || '5432',
    dbPass: process.env.DB_PASS || '',
    dbUser: process.env.DB_USER || '',
    dbName: process.env.DB_NAME || '',
  },
  {
    env: {
      region: process.env.AWS_DEFAULT_REGION,
    },
  },
);
