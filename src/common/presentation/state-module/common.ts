import { produce } from 'immer'
import { FirstDepthPath } from 'src/common/domain/constants/FIRST_DEPTH_PATHS';
import { ActionType, createReducer, createStandardAction, getType } from "typesafe-actions";

export const setFirstDepthPath = createStandardAction("@common/SET_FIRST_DEPTH_PATH")<{ firstDepthPath: FirstDepthPath }>();
export const setPaths = createStandardAction("@common/SET_PATHS")<{ pathname: string }>();

export type Action = ActionType<
  typeof setFirstDepthPath |
  typeof setPaths
>

export interface State {
  firstDepthPath: FirstDepthPath
  paths: string[]
}

const createInitialState = (): State => ({
  firstDepthPath: "/",
  paths: [],
});

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(getType(setFirstDepthPath), (state, action) => produce(state, draft => {
    draft.firstDepthPath = action.payload.firstDepthPath;
    return draft
  }))
  .handleAction(getType(setPaths), (state, action) => produce(state, draft => {
    draft.paths = action.payload.pathname.split("/").slice(1);
    draft.paths[0] = "/" + draft.paths[0];
    return draft
  }))