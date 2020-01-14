import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { Item, Handle } from './Constructor';
import Control from './Control';
import { State } from './store';

interface Props {
  list: Array<string>;
};

class ControlList extends Component<Props> {
  render() {
    return (
      this.props.list.map((control, index) => (
        <Draggable draggableId={control} index={index} key={control}>
          {provided => (
            <Item
              ref={provided.innerRef}
              {...provided.draggableProps}
            >
              <Handle
                {...provided.dragHandleProps}
              />
              {control}
            </Item>
          )}
        </Draggable>
      ))
    );
  }
}

export default connect(
  (state: State) => ({
    list: state.availableControls,
  })
)(ControlList);
