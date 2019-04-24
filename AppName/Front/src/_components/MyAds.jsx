import React from 'react';
import { connect } from 'react-redux';
import { Navbar, MyAdsList } from './../_components';

class MyAds extends React.Component {

    constructor(props)
    { 
        super(props);
        this.state = {
            myAds: [{}],
        };   
    }

    componentDidMount()
    {
        fetch(`http://localhost:49396/api/AdvertisementModels/myAds?_username=${this.props.location.state.users.userName}`)
            .then(res => res.json())
            .then(data => this.setState({myAds: data}))
    }

    render() {

    const { users } = this.props.location.state;
 
    return (    
        <div>
            <Navbar concreteUser={users}/>
                <div className="row">
                    <div className="col-md-12">
                        <MyAdsList myAds={this.state.myAds} ktos={this.props.location.state.users}/>
                    </div>
                </div>
        </div>
    );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedMyAds = connect(mapStateToProps)(MyAds);
export { connectedMyAds as MyAds };