import * as swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Application } from 'express';

function swaggerIgnite(applicationInstance: Application) {
  const { PORT, APP_PATH } = process.env;
  // Swagger definition
  const swaggerDefinition = {
      openapi: "3.0.0",
      info: {
        title: "SchoolUp Api Doc",
        version: "2.0.0",
        description: "Swagger Api Doc",
      },
      servers: [
        {
          url: "http://localhost:80",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "apiKey",
            name: "authorization",
            scheme: "bearer",
            in: "header",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
  };

  // options for the swagger docs
  const options = {
    // import swaggerDefinitions
    swaggerDefinition,
    // path to the API docs
    apis: ["./src/swagger-docs/**/*.yaml"],
  };
  // initialize swagger-jsdoc
  const swaggerSpec = swaggerJSDoc(options);

  // use swagger-Ui-express for your app documentation endpoint
  applicationInstance.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export default swaggerIgnite;