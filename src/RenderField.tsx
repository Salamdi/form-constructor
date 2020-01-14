import React from 'react';
import { Field, BaseFieldProps } from 'redux-form';

export interface RenderFieldProps extends BaseFieldProps {
  label?: string;
  type?: string;
  placeholder?: string;
};

const RenderField: React.FC<RenderFieldProps> = (props: RenderFieldProps) => {
  const { label, ...rest } = props;
  return (
    <div>
      <label>
        <Field {...rest} />
        <span>{label}</span>
      </label>
    </div>
  );
}

export default RenderField;