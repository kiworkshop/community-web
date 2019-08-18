import { Request, Response } from 'express'
import { Express } from "express-serve-static-core";
import Server from 'next-server/dist/server/next-server';

export default (app: Server, server: Express): void => {
  server.get('/mother/notice/:id', (req: Request, res: Response) => {
    const queryParams = {
      id: req.params.id,
    }

    const actualPage = '/mother/notice/detail'
    app.render(req, res, actualPage, queryParams)
  })
}