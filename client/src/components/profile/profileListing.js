import React, { Component } from 'react';
// import BussinesCard from '../business/bussinessCard';
import {HttpUtils} from "../../Services/HttpUtils";

class ProfileListing extends Component{
    constructor(props){
        super(props);
        this.state = {
              businessData: [],
              roomRentData: [],
              buySellData: [],
              jobListData: [],
              eventPortalData: [],
              education: [],
              ecommerce:[]
          }
    }

    componentDidUpdate(prevProps, prevState){
      const { userId } = this.props;
        if(prevProps.userId !== userId){        
            this.getAllBusiness();
        }
    }

    async getAllBusiness(){
        let { userId } = this.props,
        { businessData, roomRentData, buySellData, jobListData , eventPortalData , ecommerce} = this.state,
        res = await HttpUtils.get('getreviews');
        if(res && res.code && res.code == 200) {
            let req = await HttpUtils.get('marketplace');
            if(req && req.code && req.code === 200){                         
                req.busell && req.busell.map((elem) => {
                    if(elem.userid === userId){
                        let data = {...elem, ...{route: 'buySell'}}
                        buySellData.push(data)
                    }
                })
                req.business && req.business.map((elem) => {
                    if(elem.user_id === userId){
                        let data = {...elem, ...{route: 'business'}}
                        businessData.push(data)
                    }
                })
                req.roomrentsdata && req.roomrentsdata.map((elem) => {
                    if(elem.user_id === userId){
                        let data = {...elem, ...{route: 'rooms'}}
                        roomRentData.push(data)
                    }
                })
                req.jobPortalData && req.jobPortalData.map((elem) => {
                    if(elem.user_id === userId){
                        let data = {...elem, ...{route: 'jobPortal'}}
                        jobListData.push(data)
                    }
                })
                req.eventPortalData && req.eventPortalData.map((elem) => {
                    if(elem.userId === userId){
                        let data = {...elem, ...{route: 'eventPortal'}}
                        eventPortalData.push(data)
                    }
                })
                req.ecommerce && req.ecommerce.map((elem) => {
                
                    if(elem.user_Id === userId){
                        let data = {...elem, ...{route: 'ecommerce'}}
                        ecommerce.push(data);
                    }
                })            
            }
            
            this.setState({
                buySellData,
                ecommerce ,
                businessData: this.addingStarProp(businessData, res.content),
                roomRentData: this.addingStarProp(roomRentData, res.content),
                jobListData,
                eventPortalData,
            });
        }
    }

    addingStarProp(arrforLoop, rateArr){
        return arrforLoop && arrforLoop.map((elem) => {
            let rate = 0,
            len = 0;
            rateArr && rateArr.map((el) => {                    
                if(elem._id == el.objid){
                    rate += el.star ? +el.star : 0;
                    len++
                }
            })
            let star = rate / len;
            if(rate > 0 && len > 0){
                return {...elem, ...{star: star.toFixed(1)}};
            }
            return {...elem, ...{star: 0}};
        });
    }

    render(){
        let listOf = this.props.listing.length > 0 ? this.props.listing : 'businessData',
        mapTo = this.state[listOf];
        return(            
            <div className="row">
                {mapTo.map((elem) => {
                    return (
                        <div className="col-md-4">
                             {/* <BussinesCard  cardDetails={elem} detail={listOf}/> */}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ProfileListing;
