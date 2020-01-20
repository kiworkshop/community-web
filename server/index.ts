import "reflect-metadata";

import { createExpressApp } from "./common/inversify/createExpressApp";
import { createInversifyContainer } from "./common/inversify/createInversifyContainer";
import { logger } from "./common/utils";
import { errorHandlers } from "./errorHandlers";

const PORT = 3000;

createInversifyContainer().then((inversifyContainer) => {
  createExpressApp(inversifyContainer, errorHandlers).listen(PORT);
  logger.log("info", `server is running on port:${PORT}`);
})