import { combineReducers } from "redux";
import { fork } from "redux-saga/effects";
import * as detailModule from "./detail";

export const reducer = combineReducers({
  detail: detailModule.reducer,
});

export function* saga() {
  yield fork(detailModule.saga);
}