import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ITask } from './initial-data';
import styled from 'styled-components';

const Container = styled.div<{ isDragging: boolean }>`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${props => props.isDragging ? 'lightgreen' : 'white'};
  transition: background-color ease-in-out 0.2s;
`;


export interface Props {
  key: string;
  task: ITask;
  index: number;
}

export default class Task extends Component<Props, {}> {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}