import "reflect-metadata";

import { createApp } from "./common/inversify/createApp";
import { createContainer } from "./common/inversify/createContainer";
import { logger } from "./common/utils";
import { errorHandlers } from "./errorHandlers";
import "./mother/notice/api/NoticeController";

const PORT = 3000;

createApp(createContainer(), errorHandlers).listen(PORT);
logger.log("info", `server is running on port:${PORT}`);