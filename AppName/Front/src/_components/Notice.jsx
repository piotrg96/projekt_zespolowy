import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Notice extends React.Component {
    
    render() {
        
    const notice = this.props;

    return (
            <div className="mb-3 border border-success rounded">
                <img className="img-fluid w-25 h-auto p-3" src="https://avatars0.githubusercontent.com/u/810438?v=4" />
                <div className="d-inline-block ml-1 p-1">

                    <Link 
                        to={{ pathname: '/advertisementView', 
                        state: { 
                            title: notice.title, 
                            category: notice.categoryName,
                            price: notice.price,
                            description: notice.description,
                            yardage: notice.yardage,
                            city: notice.cityName,
                            phone: notice.phoneNumber
                        }}}
                    ><div className="h1">{notice.title}</div></Link>

                    <div className="h3">Category: {notice.categoryName}</div>
                    <div className="h3">Price: {notice.price} zł </div>
                </div>
            </div>
    );}
}

function mapStateToProps(state) {
    const { users, notice} = state;
    return {
        users,
        notice
    };
}

const connectedNotice = connect(mapStateToProps)(Notice);
export { connectedNotice as Notice };
