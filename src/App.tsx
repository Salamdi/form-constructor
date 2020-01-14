import React, { Component } from 'react';
import { DragDropContext, DropResult, Draggable, Droppable } from 'react-beautiful-dnd';
import { get } from 'lodash';
import { IData } from './initial-data';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { State } from './store';
import { Dispatch, Action } from 'redux';
import { addControl, rearrange } from './actions';
import { Payload } from './actions';
import ConstructorPreview from './Constructor';
import ControlList from './ControlList';
import { submit } from 'redux-form';

interface ContainerProps {
  direction?: 'row' | 'column';
}

const Container = styled.div<ContainerProps>`
  display: flex;
  padding: 8px;
`;

const Column = styled.div<{ flex?: number | string }>`
  flex: ${props => props.flex};
  border: 1px solid lightgrey;
  border-radius: 4px;
  &:first-child {
    margin-right: 8px;
  }
`;

interface AppProps {
  availableControls: Array<string>;
  addedControls: Array<{ name: string; id: string }>;
  addControl: (pyload: Payload) => Action;
  rearrange: (payload: { sourceIndex: number; destinationIndex: number }) => Action;
  save: () => void;
}

class App extends Component<AppProps, IData> {

  handleDragEnd = (result: DropResult) => {
    const from = get(result, 'source.droppableId');
    const to = get(result, 'destination.droppableId');
    if (from === 'available-controls' && to === 'constructor') {
      const index = get(result, 'destination.index');
      const control = result.draggableId;
      this.props.addControl({ control, index });
    }
    if (from === 'constructor' && to === 'constructor') {
      const sourceIndex = get(result, 'source.index');
      const destinationIndex = get(result, 'destination.index');
      this.props.rearrange({ sourceIndex, destinationIndex });
    }
  }

  handleSubmit = (values: any) => {
    const result = this.props.addedControls
      .map(control => ({...values[control.id], type: control.name}));
    console.log(result);
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <Container>
          <Droppable droppableId='available-controls'>
            {
              provided => (
                <Column
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  flex={1}
                >
                  <h3>Available Controls</h3>
                  <ControlList />
                  {provided.placeholder}
                  <button
                    style={{
                      position: 'fixed',
                      bottom: '8px',
                      right: '8px',
                      width: '40px',
                      height: '40px',
                      borderRadius: '20px',
                    }}
                    onClick={this.props.save}
                  >save</button>
                </Column>
              )
            }
          </Droppable>
          <Droppable droppableId='constructor'>
            {provided => (
              <Column
                {...provided.droppableProps}
                ref={provided.innerRef}
                flex={2}
              >
                <h3>Drop controls here</h3>
                <ConstructorPreview onSubmit={this.handleSubmit} />
                {provided.placeholder}
              </Column>
            )}
          </Droppable>
        </Container>
      </DragDropContext >
    );
  }
}

export default connect(
  (state: State) => ({
    availableControls: state.availableControls,
    addedControls: state.addedControls,
  }),
  (dispatch: Dispatch) => ({
    addControl: (payload: Payload) => dispatch(addControl(payload)),
    rearrange: (payload: { sourceIndex: number; destinationIndex: number }) => dispatch(rearrange(payload)),
    save: () => dispatch(submit('constructor')),
  })
)(App);
