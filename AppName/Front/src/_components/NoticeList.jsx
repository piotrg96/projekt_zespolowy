import React from 'react';
import { connect } from 'react-redux';
import { Notice } from './../_components/index';

const NoticeList = (props) => (
	
    <div className="my-5">
  	    {
            props.notices.map((notice, i) => <Notice key={i} {...notice}/>)       
        }
	</div>
);

function mapStateToProps(state) {
    const { notice } = state;
    return {
        notice
    };
}

const connectedNoticeList = connect(mapStateToProps)(NoticeList);
export { connectedNoticeList as NoticeList };