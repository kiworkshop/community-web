import express from 'express'
import next from 'next'
import nextI18NextMiddleware from 'next-i18next/middleware'
import inversifyServices from '../src/inversifyServices'

const nextI18next = inversifyServices.cms.common.i18NService;

export const PORT = process.env.PORT || 3000;
export const APP = next({ dev: process.env.NODE_ENV !== 'production' });
export const SERVER = express();
export const handle = APP.getRequestHandler();

APP.prepare().then(() => {
  SERVER.use(nextI18NextMiddleware(nextI18next))

  SERVER.get('*', (req, res) => handle(req, res))

  SERVER.listen(PORT)

  // tslint:disable-next-line: no-console
  console.log(`> Ready on http://localhost:${PORT}`)
})