import React from 'react';
import { MyAdvertisement } from '.';

const MyAdvertisementList = (props) => (
	
    <div className="my-5">
  	    {
            props.myAds.map((myAd, i) => 
            <MyAdvertisement 
                key={i} {...myAd} ktos={props.user}
            />)       
        }
	</div>
);

export { MyAdvertisementList };