import React, { Component } from 'react';
import RenderField from './RenderField';

export interface Props {
  id: string;
  addItem: (parnet: string) => void;
  removeItem: (id: string) => void;
  editItem: (name: string) => void;
  rearrangeItems: (id: string, previndex: number, newIndex: number) => void;
  items: Array<{ id: string; }>
};

class EditCheckbox extends Component<Props> {
  handleAddOption = () => {
    this.props.addItem(this.props.id);
  }

  render() {
    return (
      <div>
        <RenderField
          name={`${this.props.id}.name`}
          placeholder='name'
          label='name'
          component='input'
          key={`${this.props.id}.name`}
        />
        <RenderField
          name={`${this.props.id}.required`}
          label='required'
          component='input'
          type='checkbox'
          key={`${this.props.id}.required`}
        />
        {
          this.props.items.map(item => (
            <RenderField
              name={`${this.props.id}.${item}`}
              component='input'
              key={`${this.props.id}.${item}`}
            />
          ))
        }
        <button onClick={this.handleAddOption}>add option</button>
      </div>
    );
  }
}

export default EditCheckbox;
