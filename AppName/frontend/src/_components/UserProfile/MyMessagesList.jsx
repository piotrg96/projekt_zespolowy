import React from 'react';
import { MyMessage } from '.';

const MyMessagesList = (props) => (
	
    <div className="my-5">
  	    {
            props.myMsgs.map((myMsg, i) => <MyMessage key={i} {...myMsg} ktos={props.ktos} />)   
        }
	</div>
);

export { MyMessagesList };