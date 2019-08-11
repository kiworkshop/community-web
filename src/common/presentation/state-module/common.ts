import { produce } from 'immer'
import { FirstDepthPath } from 'src/common/domain/constants/FIRST_DEPTH_PATHS';
import { ActionType, createReducer, createStandardAction, getType } from "typesafe-actions";

export const setFirstDepthPath = createStandardAction("@firstDepthPath/SET_FIRST_DEPTH_PATH")<{ firstDepthPath: FirstDepthPath }>();

export type Action = ActionType<
  typeof setFirstDepthPath
>

export interface State {
  firstDepthPath: FirstDepthPath
}

const createInitialState = (): State => ({
  firstDepthPath: "/"
});

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(getType(setFirstDepthPath), (state, action) => produce(state, draft => {
    draft.firstDepthPath = action.payload.firstDepthPath;
    return draft
  }))