import React, { Component } from 'react';
import { Rate, notification, Input, Form, Icon, Button } from 'antd';
import { isMobile } from 'react-device-detect';
import { HttpUtils } from "../../../Services/HttpUtils";

const { TextArea } = Input;

const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

class ProductReviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            name: '',
            email: '',
            message: '',
            rating: 0,
            date: '',
            time: '',
            commentData: [],
            averageRatingProduct: 0
        }
    }
    componentDidMount() {
        const date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const hours = new Date().getHours();
        const min = new Date().getMinutes();
        const sec = new Date().getSeconds();
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            this.setState({
                date: date + '-' + month + '-' + year,
                time: hours + ':' + min + ':' + sec,
                userId: userData._id
            })
        }
    }
    async componentWillMount() {
        const { productId, shopId } = this.props;
        if (productId) {
            let getCommentObj = {
                productId: productId
            }
            let res = await HttpUtils.post('getecommercecomment', getCommentObj);
            if (res.content.length > 0) {
                this.setState({
                    commentData: res.content
                })
            }
            else {
                this.setState({
                    averageRatingProduct: 0
                })
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { date, time, userId } = this.state;
        const { productId, shopId } = this.props;
        let perOfProductRating;


        this.props.form.validateFields((err, values) => {
            if (!err) {

                if (values.rating == 0) {
                    perOfProductRating = 0
                }
                else if (values.rating == 0.5) {
                    perOfProductRating = 10
                }
                else if (values.rating == 1) {
                    perOfProductRating = 20
                }
                else if (values.rating == 1.5) {
                    perOfProductRating = 30
                }
                else if (values.rating == 2) {
                    perOfProductRating = 40
                }
                else if (values.rating == 2.5) {
                    perOfProductRating = 20
                }
                else if (values.rating == 3) {
                    perOfProductRating = 60
                }
                else if (values.rating == 3.5) {
                    perOfProductRating = 70
                }
                else if (values.rating == 4) {
                    perOfProductRating = 80
                }
                else if (values.rating == 4.5) {
                    perOfProductRating = 90
                }
                else if (values.rating == 5) {
                    perOfProductRating = 100
                }
                let objComment = {
                    name: values.name,
                    email: values.email,
                    message: values.message,
                    rating: values.rating,
                    date: date,
                    time: time,
                    userId: userId,
                    productId: productId,
                    shopId: shopId,
                    averageRatingProduct: perOfProductRating
                }
                this.postReview(objComment)
            }
        });
    };


    changeRating = (newRating, name) => {
        this.setState({
            rating: newRating
        });
    }

    postReview = async (objComment) => {
        const { commentData } = this.state;

        let res = await HttpUtils.post('postecommercecomment', objComment);
        if (res.code == 200) {
            this.setState({
                name: '',
                email: '',
                message: '',
                rating: 0,
                commentData: [...commentData, objComment]
            })
            notification.open({
                message: 'Your Review',
                description:
                    'Post your review about product',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
            this.calculateRating()
        }
    }

    calculateRating = async () => {
        const { commentData } = this.state;
        const { productId } = this.props;

        let numberOfPerson = 0;
        let totalPercantageOfProduct = 0;
        let finalPercantageOfProduct = 0;
        let totalAverageRateProduct = 0;
        for (var i = 0; i < commentData.length; i++) {
            numberOfPerson = numberOfPerson + 1;
            totalPercantageOfProduct = totalPercantageOfProduct + commentData[i].averageRatingProduct;
            finalPercantageOfProduct = totalPercantageOfProduct / numberOfPerson;
            totalAverageRateProduct = finalPercantageOfProduct / 20;
        }

        finalPercantageOfProduct = Math.round(finalPercantageOfProduct);

        totalAverageRateProduct = Math.floor(totalAverageRateProduct * 100) / 100;
        let rateAverage = totalAverageRateProduct.toFixed(1)

        let obj = {
            objectId: productId,
            percantageOfProduct: finalPercantageOfProduct,
            averageRateProduct: rateAverage
        }

        let responseEcommreceData = await HttpUtils.post('postecommercedata', obj)
    }


    render() {
        const { rating, name, email, message, commentData } = this.state;

        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <div className="container" style={isMobile ? { width: "92%", paddingLeft: "5px" } : { width: "85%" }}>
                <div class="vitalbox">
                    <div class="">
                        {commentData && commentData.map((elem, key) => {

                            return (
                                <div>
                                    <div class="row" style={isMobile ? { paddingRight: "10px", paddingLeft: "10px" } : { paddingRight: "80px", paddingLeft: "80px" }}>
                                        <div class="col-md-2 col-xs-3">
                                            <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid" />
                                        </div>
                                        <div class="col-md-10">
                                            <div className="row" style={{ padding: "0px" }}>
                                                <div className="col-md-6">
                                                    <h4><strong>{elem.name}</strong></h4>
                                                </div>
                                                <div className="col-md-6">
                                                    <p style={{ marginBottom: "0px", textAlign: "right" }}> Written on {elem.date} </p>
                                                </div>
                                            </div>
                                            <span style={{ paddingLeft: "10px" }}>
                                                <Rate tooltips={desc} allowHalf value={elem.rating} />
                                                {elem.rating ? <span className="ant-rate-text">{desc[elem.rating - 1]}</span> : ''}
                                            </span>
                                            <div class="clearfix"></div>
                                            <p>{elem.message}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })}

                    </div>
                    <div className="row" style={isMobile ?

                        { paddingRight: "10px", paddingLeft: "10px" } : { paddingRight: "80px", paddingLeft: "80px" }}>
                        <div className="col-md-12">
                            {/*Section: Contact v.2*/}
                            {/* <form id="contact-form" name="contact-form" action="mail.php" method="POST"> */}
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>

                                <div>
                                    {/* <h4>Your Rating :
                                    <span style={{ paddingLeft: "10px" }}>
                                        </h4>
                                        </span> */}
                                    <Form.Item label="Your Rating">

                                        {getFieldDecorator('rating', {
                                            // initialValue: rating,
                                            rules: [{
                                                required: true,
                                                message: 'Please select Start for Rate',
                                                // whitespace: true

                                            }],
                                        })(<Rate tooltips={desc} allowHalf
                                            onChange={this.changeRating}
                                            // value={rating}
                                        />)}
                                    </Form.Item>
                                    {rating ? <span className="ant-rate-text">{desc[rating - 1]}</span> : ''}

                                    <div className="row">
                                        {/*Grid column*/}
                                        <div className="col-md-12 mb-md-0 mb-5">
                                            {/*Grid row*/}
                                            <div className="row">
                                                {/*Grid column*/}
                                                <div className="col-md-6">
                                                    <div className="md-form mb-0">
                                                        {/* <label className="">Your name</label> */}
                                                        <Form.Item label="Name">
                                                            {getFieldDecorator('name', {
                                                                // initialValue: name,
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please input your name!',
                                                                    whitespace: true

                                                                }],
                                                            })(
                                                                <Input
                                                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                                    placeholder="name"
                                                                />,
                                                            )}
                                                        </Form.Item>
                                                        {/* <Input type="text" id="name1" name="name" className="form-control"
                                                            onChange={e => this.setState({ name: e.target.value })}
                                                            value={name}
                                                        /> */}
                                                    </div>
                                                </div>
                                                {/*Grid column*/}
                                                {/*Grid column*/}
                                                <div className="col-md-6">
                                                    <div className="md-form mb-0">
                                                        {/* <label className="">Your email</label> */}
                                                        <Form.Item label="E-mail">
                                                            {getFieldDecorator('email', {
                                                                // initialValue: email,
                                                                rules: [
                                                                    {
                                                                        type: 'email',
                                                                        message: 'The input is not valid E-mail!',

                                                                    },
                                                                    {
                                                                        required: true,
                                                                        message: 'Please input your E-mail!',
                                                                        whitespace: true

                                                                    },
                                                                ],
                                                            })(<Input />)}
                                                        </Form.Item>
                                                        {/* <Input type="email" id="email1" name="email" className="form-control"
                                                            onChange={e => this.setState({ email: e.target.value })}
                                                            value={email} /> */}
                                                    </div>
                                                </div>
                                                {/*Grid column*/}
                                            </div>
                                            {/*Grid row*/}
                                            {/*Grid row*/}
                                            <div className="row">
                                                {/*Grid column*/}
                                                <div className="col-md-12">
                                                    <div className="md-form">
                                                        {/* <label>Your message</label> */}
                                                        <Form.Item {...formItemLayout} label="Your message">
                                                            {getFieldDecorator('message', {
                                                                // initialValue: message,
                                                                rules: [
                                                                    {
                                                                        required: true,
                                                                        message: 'Please enter your comment',
                                                                        whitespace: true

                                                                    },
                                                                ],
                                                            })(<TextArea placeholder="Please input your comment about product!" ></TextArea>)}
                                                        </Form.Item>
                                                        {/* <TextArea type="text" id="message1" name="message" rows="2" className="form-control md-textarea"
                                                            onChange={e => this.setState({ message: e.target.value })}
                                                            value={message}></TextArea> */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/*Grid row*/}
                                            {/* </form> */}
                                            <div className="text-center text-md-left">
                                                <Button type="primary" htmlType="submit" className="login-form-button">
                                                    Send
                                                </Button>
                                                {/* <a className="btn button_custom" style={{ width: "35%" }} onClick={this.sendComment}>Send</a> */}
                                            </div>
                                            <div className="status"></div>
                                        </div>
                                        {/*Grid column*/}
                                    </div>
                                </div>
                            </Form>
                            {/*Section: Contact v.2*/}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// export default ProductReviews;
export default Form.create()(ProductReviews);
