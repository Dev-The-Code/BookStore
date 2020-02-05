import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, notification, Spin  } from 'antd';
import axios from 'axios';


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class Formsignup extends Component{

	state = {
    confirmDirty: false,
    autoCompleteResult: [],
    visible: true,
    loader:false
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
          	loader:true
          })
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios.get('http://localhost:5000/api/userregister?nickname='+values.nickname+'&email='+values.email+'&password='+values.password+'&notrobot='+values.notrobot)
        .then((response) => {
         localStorage.setItem('state', 'off');
          this.setState({
          	loader:false
          })
          this.props.form.resetFields();
          //this.state.confirmDirty='';
        })
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

   	handleipaddress = () =>{
   		axios.get('https://ipinfo.io?token=4b0cfd2794ad30').then(function(response){
   			console.log(response);
   		})
   	}
  



		render(){

			const { getFieldDecorator } = this.props.form;
            const { autoCompleteResult,visible } = this.state;
            const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
            const tailFormItemLayout = {
			      wrapperCol: {
			        xs: {
			          span: 24,
			          offset: 0,
			        },
			        sm: {
			          span: 16,
			          offset: 8,
			        },
			      },
			    };
			return(
					<div>
						<Form onSubmit={this.handleSubmit}>
							<FormItem label="Name">
						          {getFieldDecorator('nickname', {
						            rules: [{ required: true, message: 'Please input your Name!', whitespace: true }],
						          })(
						            <Input  />
						          )}
				        	</FormItem>
							<FormItem label="E-mail">
						          {getFieldDecorator('email', {
						            rules: [{
						              type: 'email', message: 'The input is not valid E-mail!',
						            }, {
						              required: true, message: 'Please input your E-mail!',
						            }],
						          })(
						            <Input  />
						          )}
        					</FormItem>
        					 <FormItem label="Password">
						          {getFieldDecorator('password', {
						            rules: [{
						              required: true, message: 'Please input your password!',
						            }, {
						              validator: this.validateToNextPassword,
						            }],
						          })(
						            <Input type="password"  />
						          )}
					        </FormItem>
					        <FormItem label="Confirm Password" >
						          {getFieldDecorator('confirm', {
						            rules: [{
						              required: true, message: 'Please confirm your password!',
						            }, {
						              validator: this.compareToFirstPassword,
						            }],
						          })(
						            <Input type="password"  onBlur={this.handleConfirmBlur} />
						          )}
        					</FormItem>
        					 <FormItem {...tailFormItemLayout}>
						          {getFieldDecorator('notrobot', {
						            valuePropName: 'checked',
						          })(
						            <Checkbox>I'm not a Robot</Checkbox>
						          )}
        					</FormItem>
        					<div className="row center_global">
	        					{this.state.loader ? antIcon : null} <button className="btn color_button">Sign up</button>
        					</div>{/*row*/}
        				<div className="row term_condition">
        					<p>(By clicking register, you agree to our <a href="#">terms</a>, our <a href="#">data policy</a> and cookies use)</p>
        				</div>
						</Form>
					</div>
				)
		}
}
const WrappedRegistrationForm = Form.create()(Formsignup);
export default WrappedRegistrationForm;