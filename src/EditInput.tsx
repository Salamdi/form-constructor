import React, { Component } from 'react';
import RenderField from './RenderField';

export interface Props {
  id: string;
};

class EditInput extends Component<Props> {
  render() {
    return (
      <div>
        <RenderField
          name={`${this.props.id}.name`}
          component='input'
          type='text'
          placeholder='name'
          label='name'
        />
        <RenderField
          name={`${this.props.id}.placeholder`}
          component='input'
          type='text'
          placeholder='placeholder'
          label='placeholder'
        />
        <RenderField
          name={`${this.props.id}.required`}
          component='input'
          type='checkbox'
          label='required'
        />
      </div>
    )
  }
};

export default EditInput;
