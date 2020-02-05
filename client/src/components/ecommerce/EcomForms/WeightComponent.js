import React from 'react';

import {
  Input, Select,
} from 'antd';

const Option = Select.Option;

class WeightInput extends React.Component {
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
      itemWeightNumber: value.itemWeightNumber || 0,
      itemWeightUnit: value.itemWeightUnit || 'kg',
    };
  }

  handleNumberChange = (e) => {
    const itemWeightNumber = parseInt(e.target.value || 0, 10);
    if (Number.isNaN(itemWeightNumber)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ itemWeightNumber });
    }
    this.triggerChange({ itemWeightNumber });
  }

  handleweightChange = (itemWeightUnit) => {
    if (!('value' in this.props)) {
      this.setState({ itemWeightUnit });
    }
    this.triggerChange({ itemWeightUnit });
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
          value={state.itemWeightNumber}
          onChange={this.handleNumberChange}
          style={{ width: '65%', marginRight: '3%' }}
        />
        <Select
          value={state.itemWeightUnit}
          size={size}
          style={{ width: '32%' }}
          onChange={this.handleweightChange}
        >
          <Option value="kg">kg</Option>
          <Option value="pounds">pound</Option>
          <Option value="lb">lb</Option>
          <Option value="gram">g</Option>
          <Option value="miligram">mg</Option>
        </Select>
      </span>
    );
  }
}

export default WeightInput;
