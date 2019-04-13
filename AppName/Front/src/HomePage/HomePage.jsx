import React from 'react';
import { Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { Navbar, Search, NoticeList} from './../_components/index';

class HomePage extends React.Component {

    constructor(props)
    { 
        super(props);
        this.state = {
            notices: [{}],
        };   
    }

    componentDidMount()
    {
        this.props.dispatch(userActions.getAll());

        fetch(`http://localhost:49396/api/AdvertisementModels`)
            .then(res => res.json())
            .then(data => this.setState({notices: data}))
    }

    render() {

    if(users === null){
         return(<Redirect to={'/login'}/>)
    }

    let users = this.props.users.items || {}
 
    return (    
        <div>
            <Navbar concreteUser={users}/>
            <Search/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <NoticeList notices={this.state.notices}/>
                    </div>
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

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };