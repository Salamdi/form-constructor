import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { ITask, IColumn } from './initial-data';
import Task from './Task';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  background-color: ${props => props.isDraggingOver ? 'skyblue' : 'white'}
  transition: background-color ease-in-out 0.2s;
  flex-grow: 1;
  min-height: 100px;
`;

export interface ColumnProps {
  column: IColumn;
  tasks: Array<ITask>;
  key: string;
}

export default class Column extends Component<ColumnProps, {}> {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, i) => <Task key={task.id} task={task} index={i} />)}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}