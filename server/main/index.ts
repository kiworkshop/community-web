import "reflect-metadata";

import { createApp } from "./common/inversify/createApp";
import { createContainer } from "./common/inversify/createContainer";
import { NextApplication } from "./common/nextjs/NextApplication";
import { logger } from "./common/utils";
import { errorHandlers } from "./errorHandlers";

const PORT = 3000;

const nextApp = new NextApplication();

nextApp.run().then(() => {
  createApp(createContainer(), errorHandlers).listen(PORT);
  logger.log("info", `server is running on port:${PORT}`);
});