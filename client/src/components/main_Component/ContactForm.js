import React, { Component } from 'react';
import moment from 'moment';
import {  notification, Icon, Spin } from 'antd';
import {HttpUtils} from "../../Services/HttpUtils";

class ContactForm extends Component{
    constructor(props){
        super()
        this.state = {
            reviews: [],
            name1: '',
            email1: '',
            msg1: '',
            loader: false,
        }
    }

    componentDidMount(){
        window.scrollTo(0,0);
    }

    componentDidUpdate(prevProps, prevState){
        let data = this.props.data;
        if(prevProps.data !== data){
            this.setState({data})
            this.getReviews(data)
        }
    }

    async getReviews(data){
        let res = await HttpUtils.get('getreviews')
        if(res.code === 200) {
            let filteredReviews = res.content.filter((elem) => elem.objid === data._id)
            this.setState({reviews: filteredReviews})
        }
    }

    onChangeReview(e){
        let target = e.target.id;
        if(target === 'name1'){
            this.setState({name1: e.target.value})
        }else if(target === 'email1'){
            this.setState({email1: e.target.value})
        }else if(target === 'message1'){
            this.setState({msg1: e.target.value})
        }
    }

    async submitReview(){
        this.setState({loader: true})
        let { name1, email1, msg1, reviews, data } = this.state;
        let obj = {
            objId: data._id,
            name : name1,
            email: email1,
            message: msg1,
            written: moment().format('LL')
        }
        let res = await HttpUtils.post('reviews', obj)
        reviews.push(obj)
        if(res.code === 200) {
            let message1 = 'Your review sent successfully'
            this.openNotification(message1)
            this.setState({name1: '', email1: '', msg1: '', star: 0, reviews, loader: false})
        }
    }

    openNotification(msg) {
        notification.open({
            message: 'Success ',
            description: msg,
        });
    };

  render(){
    const { reviews } = this.state;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, marginRight: '10px' }} spin />;
    return(
      <div className="row">
          <div className="card outset" style={{ boxShadow: "none", border:"1px solid #80808042", background: "white"}}>
              {!!reviews.length && <div className="row">
                  {reviews && reviews.map((elem, key) => {
                      return(
                          <div  key={key} className="card-body space">
                              <div className="row">
                                  <div className="col-md-12 col-sm-12 col-xs-12">
                                      <div className="col-md-6 col-sm-12 col-xs-12 " style={{paddingLeft:"0px" ,  paddingRight:"0px"}}><br/>
                                          <img src="../images/images.jpg" className="img-circle" alt="" width="100" height="100" />
                                            <h5 className="mon-timing">{elem.name}</h5>
                                      </div>
                                      <div className="col-md-2 col-sm-12 col-xs-12">
                                      </div>
                                      <div className="col-md-4 col-sm-12 col-xs-12">
                                          <a name="linkReview"><p className="star-space1">Writen On {elem.written}</p></a>
                                      </div>
                                  </div>
                                  <div className="col-md-12 col-sm-12 col-xs-12"><br/>
                                      <div className="col-md-2 col-sm-12 col-xs-12">
                                      </div>
                                      <div className="col-md-10 col-sm-12 col-xs-12">
                                          <p>{elem.message}.</p>
                                      </div>
                                  </div>
                              </div>
                              <hr />
                          </div>
                      )
                  })}
              </div>}
          </div>
          <div className="card outset" style={{ boxShadow: "none", border:"1px solid #D3D3D3", background: "white", marginTop: '50px'}}>
              <div className="card-body space">
                  <div className="row">
                      <div className="col-md-12 col-sm-12 col-xs-12">
                          <h3><b><a name="linkReview" className="black">Comments</a></b></h3>
                          <hr/>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-12">
                          <section className="section">
                              <div className="row">
                                  <div className="col-md-9 mb-md-0 mb-5">
                                      <form id="contact-form" name="contact-form" action="mail.php" method="POST">
                                          <div className="row">
                                              <div className="col-md-6">
                                                  <div className="md-form mb-0">
                                                      <label className="">Your name</label>
                                                      <input type="text" id="name1" name="name" className="form-control" value={this.state.name1} onChange={this.onChangeReview.bind(this)}/>
                                                  </div>
                                              </div>
                                              <div className="col-md-6">
                                                  <div className="">
                                                      <label className="">Your email</label>
                                                      <input type="text" id="email1" name="email" className="form-control" value={this.state.email1} onChange={this.onChangeReview.bind(this)}/>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="row">
                                              <div className="col-md-12">
                                                  <div className="">
                                                      <label style={{display:"block"}}>Your message</label>
                                                      <textarea type="text" id="message1" name="message" rows="5" style={{width:"100%"}} value={this.state.msg1} className="form-control md-textarea" onChange={this.onChangeReview.bind(this)}></textarea>
                                                  </div>
                                              </div>
                                          </div>
                                      </form>
                                      <div className="text-center text-md-left">
                                      {this.state.loader && <Spin indicator={antIcon} />}
                                          <a disabled={!!this.state.loader} className="btn button_custom" onClick={this.submitReview.bind(this)} style={{width: "35%"}}>Send</a>
                                      </div>
                                      <div className="status"></div>
                                  </div>
                              </div>
                          </section>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}

export default ContactForm;
