import React, { Component } from 'react';
import { Action } from 'redux';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Control from './Control';
import { State } from './store';
import { removeControl } from './actions';
import { reduxForm } from 'redux-form';

export const Item = styled.div`
  heigth: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: lightgrey;
`;

export const Handle = styled.div`
  width: 20px;
  align-self: stretch;
  background-color: tomato;
  margin-right: 16px;
  border: 1px solid;
`;

interface Props {
  addedControls: Array<{ id: string; name: string }>;
  removeControl: (payload: { id: string }) => Action;
  handleSubmit: (values: any) => void;
};

class ConstructorPreview extends Component<Props> {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        {
          this.props.addedControls.map((control, index) => (
            <Draggable draggableId={control.id} index={index} key={control.id}>
              {provided => (
                <Item
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                >
                  <Handle
                    {...provided.dragHandleProps}
                  />
                  <div style={{ flex: 1 }}>
                    {Control(control)}
                  </div>
                  <button
                    onClick={() => this.props.removeControl({ id: control.id })}
                  >
                    x
                  </button>
                </Item>
              )}
            </Draggable>
          ))
        }
      </form>
    );
  }
}

export default reduxForm({
  form: 'constructor',
})(
  connect(
    (state: State) => ({
      addedControls: state.addedControls,
    }),
    dispatch => ({
      removeControl: (payload: { id: string }) => dispatch(removeControl(payload)),
    }),
  )(ConstructorPreview)
);
