import React from 'react';

import {
  Input, Select,
} from 'antd';

const Option = Select.Option;

class LengthInput extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      itemLengthNumber: value.itemLengthNumber || 0,
      itemLengthUnit: value.itemLengthUnit || 'inch',
    };
  }

  handleNumberChange = (e) => {
    const itemLengthNumber = parseInt(e.target.value || 0, 10);
    if (Number.isNaN(itemLengthNumber)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ itemLengthNumber });
    }
    this.triggerChange({ itemLengthNumber });
  }

  handlelengthChange = (itemLengthUnit) => {
    if (!('value' in this.props)) {
      this.setState({ itemLengthUnit });
    }
    this.triggerChange({ itemLengthUnit });
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }

  render() {
    const { size } = this.props;
    const state = this.state;
    return (
      <span>
        <Input
          type="text"
          size={size}
          value={state.itemLengthNumber}
          onChange={this.handleNumberChange}
          style={{ width: '65%', marginRight: '3%' }}
        />
        <Select
          value={state.itemLengthUnit}
          size={size}
          style={{ width: '32%' }}
          onChange={this.handlelengthChange}
        >
          <Option value="inch">inch</Option>
          <Option value="meter">m</Option>
          <Option value="centimeter">cm</Option>
          <Option value="milimeter">mm</Option>
        </Select>
      </span>
    );
  }
}

export default LengthInput;
