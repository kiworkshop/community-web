import { Request, Response } from 'express'
import { Express } from "express-serve-static-core";
import Server from 'next-server/dist/server/next-server';
import NoticeController from '../notice/api/NoticeController'

const MotherController = (path: string, app: Server, server: Express) => {
  NoticeController(`${path}/notice`, app, server);

  server.get(path, (req: Request, res: Response) => {
    app.render(req, res, path)
  })
}

export default MotherController;