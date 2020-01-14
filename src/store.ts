import { createStore, compose, AnyAction, applyMiddleware, combineReducers } from 'redux';
import { ADD_CONTROL, REMOVE_CONTROL, REARRANGE, ADD_CONTROL_ITEM } from './actions';
import { reducer as formReducer } from 'redux-form';
import uniqueId from 'lodash/uniqueId';

export interface State {
  availableControls: Array<string>;
  addedControls: Array<Control>;
  controlItems: {
    [parent: string]: Array<string>;
  }
}

export interface Control {
  name: string;
  id: string;
};

export const initialState: State = {
  availableControls: ['INPUT', 'TEXTAREA', 'CHECKBOX', 'RADIO', 'SELECT', 'FILE'],
  addedControls: [],
  controlItems: {},
}

const controls = ['INPUT', 'TEXTAREA', 'CHECKBOX', 'RADIO', 'SELECT', 'FILE'];

const availableControls = (state = controls, action: AnyAction) => state;

export const addedControls = function (
  state: Array<Control> = [],
  action: AnyAction,
) {
  const { type, payload } = action;
  switch (type) {
    case ADD_CONTROL: {
      const { name, id, index } = payload;
      const addedControls = state.slice();
      addedControls.splice(index, 0, { name, id });
      return addedControls;
    }
    case REMOVE_CONTROL: {
      const { id } = payload;
      const newState = state.filter(control => control.id !== id);
      return newState;
    }
    case REARRANGE: {
      const { sourceIndex, destinationIndex } = payload;
      const newState = state.slice();
      const movedControlArray = newState.splice(sourceIndex, 1);
      newState.splice(destinationIndex, 0, ...movedControlArray);
      return newState;
    }
    default:
      return state;
  }
}

const controlItems = (state: { [parent: string]: Array<string> } = {}, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_CONTROL: {
      const { id } = payload;
      return { ...state, [id]: [] };
    }
    case REMOVE_CONTROL: {
      const { id } = payload;
      const newState = Object.assign({}, state);
      delete newState[id];
      return newState;
    }
    case ADD_CONTROL_ITEM: {
      const { parent, id } = payload;
      const items = state[parent];
      return {
        ...state,
        [parent]: [...items, id],
      };
    }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  addedControls,
  availableControls,
  controlItems,
  form: formReducer,
});

const uid = () => (next: Function) => (action: AnyAction) => {
  const { type, payload } = action;
  if (type === ADD_CONTROL) {
    const { control, index } = payload;
    return next({ type, payload: { name: control, index, id: uniqueId('control-') } });
  }
  if (type === ADD_CONTROL_ITEM) {
    const id = uniqueId('item-');
    const parent = payload;
    return next({ type, payload: { parent, id } });
  }
  return next(action);
}

declare const __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;

const composeEnhancers = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(uid),
  ),
);

export default store;
