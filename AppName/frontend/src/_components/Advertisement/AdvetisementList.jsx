import React from 'react';
import { Advertisement } from '.';

const AdvetisementList = (props) => (
	
    <div className="my-5">
  	    {
            props.notices.map((notice, i) => <Advertisement key={i} {...notice} />)       
        }
	</div>
);

export { AdvetisementList };