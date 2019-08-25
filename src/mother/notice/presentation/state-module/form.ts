// tslint:disable: no-identical-functions

import { produce } from 'immer'
import Router from 'next/router';
import { call, put, takeLatest } from "redux-saga/effects";
import { Id } from 'src/common/domain/Id';
import inversifyServices from "src/inversifyServices";
import { ActionType, createAsyncAction, createReducer, createStandardAction, getType } from "typesafe-actions";
import NoticeFormDto from '../../api/dto/NoticeFormDto';
import NoticeRequestDto from '../../api/dto/NoticeRequestDto';
import Notice from "../../domain/Notice";

export const reset = createStandardAction("@noticeForm/RESET")();

export const fetchInitialNotice = createStandardAction("@noticeForm/FETCH_INITIAL_NOTICE")<{ id: number }>();
const fetchInitialNoticeAsync = createAsyncAction(
  '@noticeForm/FETCH_INITIAL_NOTICE_REQUEST',
  '@noticeForm/FETCH_INITIAL_NOTICE_SUCCESS',
  '@noticeForm/FETCH_INITIAL_NOTICE_FAILURE',
)<void, { initialNoticeFormDto: NoticeFormDto }, void>();

export const postNotice = createStandardAction("@noticeForm/POST_NOTICE")<{ noticeFormDto: NoticeFormDto }>();
const postNoticeAsync = createAsyncAction(
  '@noticeForm/POST_NOTICE_REQUEST',
  '@noticeForm/POST_NOTICE_SUCCESS',
  '@noticeForm/POST_NOTICE_FAILURE',
)<void, void, void>();

export const putNotice = createStandardAction("@noticeForm/PUT_NOTICE")<{ id: Id, noticeFormDto: NoticeFormDto }>();
const putNoticeAsync = createAsyncAction(
  '@noticeForm/PUT_NOTICE_REQUEST',
  '@noticeForm/PUT_NOTICE_SUCCESS',
  '@noticeForm/PUT_NOTICE_FAILURE',
)<void, void, void>();

export type Action = ActionType<
  typeof reset |
  typeof fetchInitialNotice |
  typeof fetchInitialNoticeAsync.request |
  typeof fetchInitialNoticeAsync.success |
  typeof fetchInitialNoticeAsync.failure |
  typeof postNotice |
  typeof postNoticeAsync.request |
  typeof postNoticeAsync.success |
  typeof postNoticeAsync.failure |
  typeof putNotice |
  typeof putNoticeAsync.request |
  typeof putNoticeAsync.success |
  typeof putNoticeAsync.failure
>

export interface State {
  initialNoticeFormDto: NoticeFormDto
  pending: boolean
  rejected: boolean
}

// Initial State
const createInitialState = () => ({
  initialNoticeFormDto: NoticeFormDto.of({
    id: -1,
    title: "",
    content: ""
  }),
  pending: true,
  rejected: false
} as State);

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(getType(reset), createInitialState)
  .handleAction(getType(fetchInitialNoticeAsync.request), (state) => produce(state, draft => {
    draft.pending = true;
    return draft;
  }))
  .handleAction(getType(fetchInitialNoticeAsync.success), (state, action) => produce(state, draft => {
    draft.pending = false;
    draft.initialNoticeFormDto = action.payload.initialNoticeFormDto;
    return draft;
  }))
  .handleAction(getType(fetchInitialNoticeAsync.failure), (state) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    return draft;
  }))
  .handleAction(getType(postNoticeAsync.request), (state) => produce(state, draft => {
    draft.pending = true;
    return draft;
  }))
  .handleAction(getType(postNoticeAsync.success), (state) => produce(state, draft => {
    draft.pending = false;
    return draft;
  }))
  .handleAction(getType(postNoticeAsync.failure), (state) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    return draft;
  }))
  .handleAction(getType(putNoticeAsync.request), (state) => produce(state, draft => {
    draft.pending = true;
    return draft;
  }))
  .handleAction(getType(putNoticeAsync.success), (state) => produce(state, draft => {
    draft.pending = false;
    return draft;
  }))
  .handleAction(getType(putNoticeAsync.failure), (state) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    return draft;
  }))

export function* saga() {
  yield takeLatest(getType(fetchInitialNotice), sagaFetchInitialNotice);
  yield takeLatest(getType(postNotice), sagaPostNotice);
  yield takeLatest(getType(putNotice), sagaPutNotice);
}

const noticeService = inversifyServices.mother.notice.service
function* sagaFetchInitialNotice(action: ActionType<typeof fetchInitialNotice>): Generator {
  yield put(fetchInitialNoticeAsync.request())
  const { id } = action.payload
  try {
    const notice: Notice = yield call(noticeService.getNotice, id);
    const initialNoticeFormDto = yield call(NoticeFormDto.of, notice);
    yield put(fetchInitialNoticeAsync.success({ initialNoticeFormDto }));
  } catch (e) {
    yield put(fetchInitialNoticeAsync.failure());
  }
}

function* sagaPostNotice(action: ActionType<typeof postNotice>): Generator {
  yield put(postNoticeAsync.request())
  const { noticeFormDto } = action.payload;
  try {
    const noticeRequestDto = NoticeRequestDto.of(noticeFormDto);
    const id: Id = yield call(noticeService.postNotice, noticeRequestDto);
    yield put(postNoticeAsync.success());
    Router.push(`/mother/notice/detail?id=${id}`, `/mother/notice/${id}`)
  } catch (e) {
    yield put(postNoticeAsync.failure());
  }
}

function* sagaPutNotice(action: ActionType<typeof putNotice>): Generator {
  yield put(postNoticeAsync.request())
  const { id, noticeFormDto } = action.payload;
  try {
    const noticeRequestDto = NoticeRequestDto.of(noticeFormDto);
    yield call(noticeService.putNotice, id, noticeRequestDto);
    yield put(postNoticeAsync.success());
    Router.push(`/mother/notice/detail?id=${id}`, `/mother/notice/${id}`)
  } catch (e) {
    yield put(postNoticeAsync.failure());
  }
}