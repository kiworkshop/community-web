import { TOptions } from "i18next";
import produce from "immer";
import { OptionsObject, VariantType } from "notistack";
import Optional from "optional-js";
import { ActionType, createReducer, createStandardAction, getType } from "typesafe-actions";
import uuid from 'uuid';

export interface SnackbarEnqueuePayload {
  message: string | string[]
  messageOptions?: TOptions | string
  variant: VariantType
  options?: OptionsObject | { onClose: any }
}

export interface Snackbar {
  key: string
  message: string | string[]
  messageOptions?: TOptions | string
  dismissed?: boolean
  options?: OptionsObject | { onClose: any }
}

export const reset = createStandardAction("@snackbar/RESET")();
export const enqueueSnackbar = createStandardAction("@snackbar/ENQUEUE_SNACKBAR")<{ snackbar: SnackbarEnqueuePayload }>();
export const dismissSnackbar = createStandardAction("@snackbar/DISMISS_SNACKBAR")<{ key: string }>();
export const removeSnackbar = createStandardAction("@snackbar/REMOVE_SNACKBAR")<{ key: string }>();

export type Action = ActionType<
  typeof reset |
  typeof enqueueSnackbar |
  typeof dismissSnackbar |
  typeof removeSnackbar
>

export interface State {
  snackbars: Snackbar[]
}

const createInitialState = (): State => ({
  snackbars: [],
});

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(getType(enqueueSnackbar), (state, action) => produce(state, draft => {
    const { snackbar } = action.payload;
    draft.snackbars.push({
      ...snackbar,
      options: {
        ...snackbar.options,
        variant: snackbar.variant
      },
      key: uuid.v4(),
    });
    return draft
  }))
  .handleAction(getType(dismissSnackbar), (state, action) => produce(state, draft => {
    const { key } = action.payload;

    Optional.ofNullable(draft.snackbars.find(s => s.key === key))
      .map(s => s.dismissed = true);
    return draft
  }))
  .handleAction(getType(removeSnackbar), (state, action) => produce(state, draft => {
    const { key } = action.payload;
    draft.snackbars = draft.snackbars.filter(s => s.key !== key);
    return draft
  }))