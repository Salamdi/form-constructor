import { ActionCreator, Action } from "redux";

export const ADD_CONTROL = 'ADD_CONTROL';
export const REMOVE_CONTROL = 'REMOVE_CONTROL';
export const REARRANGE = 'REARRANGE';
export const ADD_CONTROL_ITEM = 'ADD_CONTROL_ITEM';

export interface Payload {
  control: string;
  index: number;
};

export interface ADD_CONTROL_ACTION extends Action {
  type: 'ADD_CONTROL';
  payload: Payload;
};

export interface REMOVE_CONTROL {
  type: 'REMOVE_CONTROL',
  payload: {
    id: string;
  };
};

export interface REARRANGE_CONTROLS {
  type: 'REARRANGE';
  payload: {
    sourceIndex: number;
    destinationIndex: number;
  };
};

export interface ADD_CONTROL_ACTION_WITH_ID extends Action {
  type: 'ADD_CONTROL';
  payload: {
    name: string;
    index: number;
    id: string;
  };
};

export interface ADD_CONTROL_ITEM_TYPE {
  type: 'ADD_CONTROL_ITEM';
  payload: {
    parent: string;
    id: string;
  }
}

export const addControl: ActionCreator<ADD_CONTROL_ACTION> = (payload: { control: string, index: number }) => ({
  type: ADD_CONTROL,
  payload,
});

export const removeControl: ActionCreator<REMOVE_CONTROL> = (payload: { id: string }) => ({
  type: REMOVE_CONTROL,
  payload,
});

export const rearrange: ActionCreator<REARRANGE_CONTROLS> = (
  payload: { destinationIndex: number; sourceIndex: number }
) => ({
  type: REARRANGE,
  payload,
});

export const addControlItem: ActionCreator<ADD_CONTROL_ITEM_TYPE> = (
  payload: { parent: string; id: string }
) => ({
  type: ADD_CONTROL_ITEM,
  payload,
})
