import React from 'react';

import {
  Input, Select,
} from 'antd';

const Option = Select.Option;

class WidthInput extends React.Component {
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
      itemWidthNumber: value.itemWidthNumber || 0,
      itemWidthUnit: value.itemWidthUnit || 'inch',
    };
  }

  handleNumberChange = (e) => {
    const itemWidthNumber = parseInt(e.target.value || 0, 10);
    if (Number.isNaN(itemWidthNumber)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ itemWidthNumber });
    }
    this.triggerChange({ itemWidthNumber });
  }

  handlewidthChange = (itemWidthUnit) => {
    if (!('value' in this.props)) {
      this.setState({ itemWidthUnit });
    }
    this.triggerChange({ itemWidthUnit });
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
          value={state.itemWidthNumber}
          onChange={this.handleNumberChange}
          style={{ width: '65%', marginRight: '3%' }}
        />
        <Select
          value={state.itemWidthUnit}
          size={size}
          style={{ width: '32%' }}
          onChange={this.handlewidthChange}
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

export default WidthInput;
