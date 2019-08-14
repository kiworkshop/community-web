import { produce } from 'immer'
import { call, put, takeLatest } from "redux-saga/effects";
import inversifyServices from "src/inversifyServices";
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
  notice: {
    id: -1,
    title: "",
    content: ""
  },
  pending: true,
  rejected: false
});

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(getType(reset), createInitialState)
  .handleAction(getType(fetchNotice), (state) => produce(state, draft => {
    draft.pending = false
    return draft;
  }))
  .handleAction(getType(fetchNoticeAsync.request), (state) => produce(state, draft => {
    draft.pending = false;
    return draft;
  }))
  .handleAction(getType(fetchNoticeAsync.success), (state, action) => produce(state, draft => {
    draft.notice = action.payload.notice;
    return draft;
  }))
  .handleAction(getType(fetchNoticeAsync.failure), (state) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    return draft;
  }))

export function* saga() {
  yield takeLatest(getType(fetchNotice), sagaFetchNotice);
}

const noticeService = inversifyServices.cms.mother.notice.service
function* sagaFetchNotice(action: ActionType<typeof fetchNotice>): Generator {
  yield put(fetchNoticeAsync.request())
  const { id } = action.payload
  try {
    const notice = yield call(noticeService.getNotice, id);
    yield put(fetchNoticeAsync.success({ notice }));
  } catch (e) {
    yield put(fetchNoticeAsync.failure());
  }
}