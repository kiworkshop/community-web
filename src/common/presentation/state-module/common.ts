import { produce } from 'immer'
import { ActionType, createReducer, createStandardAction, getType } from "typesafe-actions";

export const setPaths = createStandardAction("@common/SET_PATHS")<{ pathname: string }>();

export type Action = ActionType<
  typeof setPaths
>

export interface State {
  paths: string[]
}

const createInitialState = (): State => ({
  paths: [],
});

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(getType(setPaths), (state, action) => produce(state, draft => {
    draft.paths = action.payload.pathname.split("/").slice(1);
    draft.paths[0] = "/" + draft.paths[0];
    return draft
  }))