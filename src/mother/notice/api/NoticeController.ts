import { Request, Response } from 'express'
import { Express } from "express-serve-static-core";
import Server from 'next-server/dist/server/next-server';

export default (path: string, app: Server, server: Express): void => {
  server.get(`${path}/:id`, (req: Request, res: Response) => {
    const queryParams = {
      id: req.params.id,
    }

    const actualPage = `${path}/detail`
    app.render(req, res, actualPage, queryParams)
  })

  server.get(path, (req: Request, res: Response) => {
    app.render(req, res, path)
  })
}