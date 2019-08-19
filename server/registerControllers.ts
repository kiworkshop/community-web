import { Request, Response } from 'express'
import { Express } from "express-serve-static-core";
import Server from 'next-server/dist/server/next-server';
import ContentController from 'src/content/api/ContentController';
import MotherController from 'src/mother/api/MotherController'

const registerControllers = (app: Server, server: Express) => {
  MotherController('/mother', app, server);
  ContentController('/content', app, server);

  server.get("/", (req: Request, res: Response) => {
    app.render(req, res, "/")
  })
}

export default registerControllers