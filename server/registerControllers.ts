import { Express } from "express-serve-static-core";
import Server from 'next-server/dist/server/next-server';
import MotherController from 'src/mother/api/MotherController'

const registerControllers = (app: Server, server: Express) => {
  MotherController('/mother', app, server);
}

export default registerControllers