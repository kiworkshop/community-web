import { Record } from "immutable";
import inversifyServices from "inversify.services";
import Router from 'next/router';
import { call, put, takeEvery } from "redux-saga/effects";
import { ActionType, createAsyncAction, createReducer, createStandardAction, getType } from "typesafe-actions";
import Notice from "../../domain/model/Notice";

export const reset = createStandardAction("@noticeDetail/RESET")();

export const fetchNotice = createStandardAction("@noticeDetail/FETCH_NOTICE")<{ id: number }>();
const fetchNoticeAsync = createAsyncAction(
  '@noticeDetail/FETCH_NOTICE_REQUEST',
  '@noticeDetail/FETCH_NOTICE_SUCCESS',
  '@noticeDetail/FETCH_NOTICE_FAILURE',
)<void, { notice: Notice }, void>();

export type Action = ActionType<
  typeof reset |
  typeof fetchNotice |
  typeof fetchNoticeAsync.request |
  typeof fetchNoticeAsync.success |
  typeof fetchNoticeAsync.failure
>

export type State = Record<{
  notice: Notice
  pending: boolean
  rejected: boolean
}>;

// Initial State
const createInitialState = Record({
  notice: Notice.builder()
    .id(-1)
    .title("title")
    .content("content").build(),
  pending: true,
  rejected: false
});

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(getType(reset),
    (_, __) => createInitialState())
  .handleAction(getType(fetchNoticeAsync.request),
    (state) => state.set("pending", true))
  .handleAction(getType(fetchNoticeAsync.success),
    (state, action) => state.merge({
      notice: action.payload.notice,
      pending: false
    }))
  .handleAction(getType(fetchNoticeAsync.failure),
    (state) => state.merge({
      pending: false,
      rejected: true
    }))

export function* saga() {
  yield takeEvery(getType(fetchNotice), sagaFetchNotice);
}

const noticeService = inversifyServices.cms.mother.notice.service
function* sagaFetchNotice(action: ActionType<typeof fetchNotice>) {
  yield put(fetchNoticeAsync.request())
  const { id } = action.payload
  try {
    const notice = yield call(noticeService.getNotice, id);

    yield put(fetchNoticeAsync.success({ notice }));
  } catch (e) {
    yield put(fetchNoticeAsync.failure());
    Router.push('/cms/mother/notice')
  }
}