import { Express } from "express-serve-static-core";
import Server from 'next-server/dist/server/next-server';
import NoticeController from './notice/api/NoticeController'

const registerMotherApiControllers = (app: Server, server: Express) => {
  NoticeController(app, server);
}

export default registerMotherApiControllers;