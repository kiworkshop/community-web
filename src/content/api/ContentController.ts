import { Request, Response } from 'express'
import { Express } from "express-serve-static-core";
import Server from 'next-server/dist/server/next-server';

const ContentController = (path: string, app: Server, server: Express) => {
  server.get(path, (req: Request, res: Response) => {
    app.render(req, res, path)
  })
}

export default ContentController;