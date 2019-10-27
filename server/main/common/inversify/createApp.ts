import * as bodyParser from 'body-parser';
import { ErrorRequestHandler } from 'express-serve-static-core';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import nextI18NextMiddleware from 'next-i18next/middleware';
import Optional from 'optional-js';
import I18NService from 'src/common/service/I18NService';
import "../../mother/notice/api/NoticeController";
import { defaultErrorHandler } from "../error/DefaultErrorHandler";
import { NextApp } from '../nextjs/NextApp';

export const createApp = (container: Container, errorHandlers?: ErrorRequestHandler[]) => new InversifyExpressServer(container)
  .setConfig((theApp) => {
    theApp.use(bodyParser.urlencoded({ extended: true }));
    theApp.use(bodyParser.json());

    theApp.use(nextI18NextMiddleware(I18NService));

  })
  .setErrorConfig((theApp) => {
    Optional.ofNullable(errorHandlers)
      .map(handlers => handlers.forEach(h => theApp.use(h)));

    const handle = new NextApp().get().getRequestHandler();

    theApp.get("*", (req, res) => handle(req, res));

    theApp.use(defaultErrorHandler);
  })
  .build();