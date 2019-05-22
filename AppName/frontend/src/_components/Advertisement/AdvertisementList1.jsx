import React from 'react';
import { Advertisement1 } from '.';

const AdvertisementList1 = (props) => (
	
    <div className="my-5">
  	    {
            props.notices.map((notice, i) => <Advertisement1 key={i} {...notice} />)       
        }
	</div>
);

export { AdvertisementList1 };