import * as cdk from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

import * as apiGateway from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';

import { Construct } from 'constructs';

/**
 * Stack, which creates NestApp Lambda
 *
 * @export
 * @class CartServiceStack
 * @extends {cdk.Stack}
 */
export class CartServiceStack extends cdk.Stack {
  readonly region: string;

  constructor(
    scope: Construct,
    id: string,
    options: any,
    props?: cdk.StackProps,
  ) {
    super(scope, id, props);

    this.region = props?.env?.region ?? 'eu-north-1';

    const cartServiceLambda = new NodejsFunction(this, 'cart-service-lambda', {
      functionName: 'cartService',
      entry: 'dist/main.js',
      environment: {
        DB_HOST: options.dbHost,
        DB_PORT: options.dbPort,
        DB_PASS: options.dbPass,
        DB_USER: options.dbUser,
        DB_NAME: options.dbName,
      },
      memorySize: 128,
      timeout: cdk.Duration.seconds(5),
      description: 'Cart service Lambda',
      bundling: {
        sourceMap: true,
        minify: true,
        externalModules: [
          '@nestjs/microservices/microservices-module',
          '@nestjs/websockets/socket-module',
          '@nestjs/microservices',
          'class-transformer',
          'class-validator',
        ],
      },
    });

    const api = new apiGateway.HttpApi(this, 'Cart-service-API', {
      corsPreflight: {
        allowHeaders: ['*'],
        allowOrigins: ['*'],
        allowMethods: [apiGateway.CorsHttpMethod.ANY],
      },
    });

    api.addRoutes({
      path: '/{proxy+}',
      methods: [apiGateway.HttpMethod.ANY],
      integration: new HttpLambdaIntegration(
        'CartServiceProxyIntegration',
        cartServiceLambda,
      ),
    });
  }
}
