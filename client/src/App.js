import React, { Component } from   'react';
import 'antd/dist/antd.css';
import Burgermenu from './components/header/burgermenu';
import Slider from './components/header/Slider';
import {HttpUtils} from "./Services/HttpUtils";



class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            response: ''
        };
    }

    // componentDidMount() {
    //     this.getAllBusiness();
    //     // this.callApi()
    //     //     .then(res => this.setState({ response: res.express }))
    //     //     .catch(err => console.log(err));

    // }

    // async getAllBusiness(){
    //     var req = await HttpUtils.get('marketplace')
    //     //console.log(req, 'reqqqqqqqqqqqq Appppppppppp')
    // }

    // callApi = async () => {
        // const response = await fetch('/api/hello');
        // const sports = await axios.get('https://newsapi.org/v2/top-headlines?sources=bbc-sport&apiKey=6e7e6a696773424187f9bdb80954ded7');
        // console.log(sports, 'sportssssssssss')
        // const news = await axios.get('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=6e7e6a696773424187f9bdb80954ded7');
        // console.log(news, 'newssssssssssssssss')
        // const body = await response.json();
    //
    //     if (response.status !== 200) throw Error(body.message);
    //     return body;
    // };

    render() {
        const hide=true;
        return (
            <div >
            {/*<img src={'../images/home.png'} style={{width: '100%', position: 'relative', marginTop: '-20px'}}/>*/}
                <span className="hidden-xs" style={{marginTop : "46px"}}></span>
                <span className="visible-xs" style={{marginTop : "-19px"}}></span>
                {/*<div className ="" style={{"backgroundImage":"url('../images/home-1.png')"backgroundSize: 'cover' }}>*/}
                    <div>
                    <div className="background-image" >
                        <Burgermenu/>
                        <Slider mainH1="Pak Jazba" mainH2="Connecting Communities" hide={hide} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
