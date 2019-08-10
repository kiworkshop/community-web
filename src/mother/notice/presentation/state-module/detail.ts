import { produce } from 'immer'
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

export interface State {
  notice: Notice
  pending: boolean
  rejected: boolean
}

// Initial State
const createInitialState = () => ({
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
  .handleAction(getType(fetchNotice),
    (state, __) => produce(state, draft => {
      draft.pending = false
      return draft;
    }))
  .handleAction(getType(fetchNoticeAsync.request),
    (state) => produce(state, draft => {
      draft.pending = false;
      return draft;
    }))
  .handleAction(getType(fetchNoticeAsync.success),
    (state, action) => produce(state, draft => {
      draft.notice = action.payload.notice;
      return draft;
    }))
  .handleAction(getType(fetchNoticeAsync.failure),
    (state) => produce(state, draft => {
      draft.pending = false;
      draft.rejected = true;
      return draft
    }))

export function* saga() {
  yield takeEvery(getType(fetchNotice), sagaFetchNotice);
}

const noticeService = inversifyServices.cms.mother.notice.service
function* sagaFetchNotice(action: ActionType<typeof fetchNotice>) {
  yield put(fetchNoticeAsync.request())
  const { id } = action.payload
  try {
    const notice = yield call(() => noticeService.getNotice(id));

    yield put(fetchNoticeAsync.success({ notice }));
  } catch (e) {
    yield put(fetchNoticeAsync.failure());
    Router.push('/cms/mother/notice')
  }
}