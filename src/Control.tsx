import React, { Props, ComponentType, Component } from 'react';
import EditInput from './EditInput';
import EditCheckbox from './EditCheckbox';
import { ConnectedComponent, connect } from 'react-redux';
import { FieldArray } from 'redux-form';
import { State } from './store';
import { addControlItem } from './actions';
import uniqueId from 'lodash/uniqueId';
import RenderField from './RenderField';
import { Droppable, Draggable, DragDropContext, DropResult } from 'react-beautiful-dnd';
import { get } from 'lodash';

const HOC = (C: string, props: Props<HTMLElement>) => <C {...props} />;

const ItemsHOC = (
  WrappedComponent: any,
  id: string
): ConnectedComponent<any, any> => connect(
  (state: State) => ({
    items: state.controlItems[id],
  }),
  (dispatch) => ({
    addItem: (paylaod: { parent: string; id: string }) => dispatch(addControlItem(paylaod))
  }),
)(WrappedComponent);

const ControlWithItems = (props: any) => {
  const addItem = () => {
    const id = uniqueId('item-');
    props.fields.push({ id, value: '' });
  }

  const removeItem = () => {

  }

  const handleDragEnd = (result: DropResult) => {
    if (result.source.droppableId === props.id) {
      const from = result.source.index;
      const to = get(result, 'destination.index');
      props.fields.move(from, to);
    }
  }
  console.log(props);
  return (
    <div>
      <button
        onClick={addItem}
      >
        add item
      </button>
      <DragDropContext
        onDragEnd={handleDragEnd}
      >
        <Droppable
          droppableId={props.id}
        >
          {
            provided => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {props.fields.map((f: string, i: number) => (
                  <Draggable
                    draggableId={f}
                    index={i}
                    key={f}
                  >
                    {provided => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <div style={{ marginLeft: '16px' }}>
                          <RenderField
                            name={`${f}.value`}
                            component='input'
                          />
                          <button onClick={removeItem}>remove</button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default function control({ name, id }: { name: string; id: string }, props: any = {}): any {
  switch (name) {
    case 'INPUT': {
      return <EditInput id={id} />;
    }
    case 'TEXTAREA': {
      return <EditInput id={id} />;
    }
    case 'CHECKBOX': {
      /* const Comp = ItemsHOC(EditCheckbox, id)
      return (
        <Comp
          id={id}
          editItem={console.log}
          removeItem={console.log}
          rearrangeItems={console.log}
        />
      ); */
      return (
        <div>
          <RenderField
            name={`${id}.name`}
            placeholder='name'
            label='name'
            component='input'
          />
          <FieldArray
            name={`${id}.items`}
            component={ControlWithItems}
            id={id}
          />
        </div>
      );
    }
    case 'RADIO': {
      return HOC('input', { ...props, type: 'radio' });
    }
    case 'SELECT': {
      return HOC('select', props);
    }
    case 'FILE': {
      return HOC('input', { ...props, type: 'file' });
    }
    default: {
      return HOC('p', { children: [name] })
    }
  }
}
