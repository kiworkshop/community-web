import { combineReducers } from "redux";

import { fork } from "redux-saga/effects";
import * as mjArticleModule from "../../mjarticle/presentation/state-module";

export const reducer = combineReducers({
  mjArticle: mjArticleModule.reducer
});

export function* saga() {
  yield fork(mjArticleModule.saga)
}