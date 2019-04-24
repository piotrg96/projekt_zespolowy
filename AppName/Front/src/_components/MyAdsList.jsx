import React from 'react';
import { connect } from 'react-redux';
import { MyAd } from './../_components/index';

const MyAdsList = (props) => (
	
    <div className="my-5">
  	    {
            props.myAds.map((myAd, i) => <MyAd key={i} {...myAd} ktos={props.ktos} />)       
        }
	</div>
);

function mapStateToProps(state) {
    const { myAd } = state;
    return {
        myAd
    };
}

const connectedMyAdsList = connect(mapStateToProps)(MyAdsList);
export { connectedMyAdsList as MyAdsList };