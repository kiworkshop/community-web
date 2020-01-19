import { produce } from 'immer'
import { call, put, takeLatest } from "redux-saga/effects";
import Page from 'src/common/domain/model/Page';
import { enqueueSnackbar } from 'src/common/presentation/state-module/snackbar';
import stringify from 'src/util/stringify';
import { ActionType, createAsyncAction, createReducer, createStandardAction, getType } from "typesafe-actions";
import { MjArticle } from '../../domain/model/MjArticle';
import { mjArticleRepository } from '../../infrastructure/repository/MjArticleRepository';

export const reset = createStandardAction("@mjArticleList/RESET")();

export const fetchMjArticlePage = createStandardAction("@mjArticleList/FETCH_NOTICE_PAGE")();
const fetchMjArticlePageAsync = createAsyncAction(
  '@mjArticleList/FETCH_NOTICE_PAGE_REQUEST',
  '@mjArticleList/FETCH_NOTICE_PAGE_SUCCESS',
  '@mjArticleList/FETCH_NOTICE_PAGE_FAILURE',
)<void, { page: Page<MjArticle> }, void>();

export type Action = ActionType<
  typeof reset |
  typeof fetchMjArticlePage |
  typeof fetchMjArticlePageAsync.request |
  typeof fetchMjArticlePageAsync.success |
  typeof fetchMjArticlePageAsync.failure
>

export interface State {
  page: Page<MjArticle>
  pending: boolean
  rejected: boolean
}

// Initial State
const createInitialState = () => ({
  page: { content: [] as MjArticle[] },
  pending: true,
  rejected: false
} as State);

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(getType(reset), createInitialState)
  .handleAction(getType(fetchMjArticlePageAsync.request), (state) => produce<State, State>(state, draft => {
    draft.pending = true;
    draft.rejected = false;
    return draft;
  }))
  .handleAction(getType(fetchMjArticlePageAsync.success), (state, action) => produce<State, State>(state, draft => {
    draft.pending = false;
    draft.page = action.payload.page;
    return draft;
  }))
  .handleAction(getType(fetchMjArticlePageAsync.failure), (state) => produce<State, State>(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    return draft;
  }))

export function* saga() {
  yield takeLatest(getType(fetchMjArticlePage), sagaFetchMjArticle);
}

function* sagaFetchMjArticle() {
  yield put(fetchMjArticlePageAsync.request())
  try {
    const page: Page<MjArticle> = yield call(mjArticleRepository.findAll, { page: 1, size: 1 << 31 - 1 });
    yield put(fetchMjArticlePageAsync.success({ page }));
  } catch (e) {
    yield put(fetchMjArticlePageAsync.failure());
    yield put(enqueueSnackbar({
      snackbar: {
        message: 'noti:mother.mjArticle.get.rejected',
        messageOptions: { e: stringify(e) },
        variant: 'error'
      }
    }))
  }
}