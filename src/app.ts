import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import { router } from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { swaggerSpec } from './config/swagger';

class App {
  public express: Application;

  constructor() {
    this.express = express();
    this.middlewares();
    this.swaggerDocs();
    this.routes();
    this.errorHandling();
  }

  private middlewares(): void {
    this.express.use(express.json());
  }

  private swaggerDocs(): void {
    this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  private routes(): void {
    this.express.use('/api', router);
  }

  private errorHandling(): void {
    this.express.use(errorHandler);
  }
}

export default new App().express;