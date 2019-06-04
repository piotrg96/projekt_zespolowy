import React from 'react';
import { userService } from '../../_services';
import { Navbar } from '..';
import Notifications from '../Notifications';
import { MyMessagesList } from './MyMessagesList';

class MyMessagess extends React.Component {

    constructor(props)
    { 
        super(props);
        this.state = {
            myMsgs: [{}],
            user: '',
        };   
    }

    componentDidMount()
    {
        userService.getUser()
            .then(res => res.json())
            .then(data => this.setState({user: data})); 
            
        fetch(`http://localhost:49396/api/MessageModels/user?user=${this.props.location.state.users.userName}`)
            .then(res => res.json())
            .then(data => this.setState({myMsgs: data}));
    }

    render() {

    //const { users } = this.props.location.state;
    
    return (    
        <div>
            <Notifications/>
            <Navbar concreteUser={this.state.user}/>
                <div className="row">
                    <div className="col-md-12">
                        <MyMessagesList myMsgs={this.state.myMsgs} ktos={this.state.user}/>
                    </div>
                </div>
        </div>
    );
    }
}

export { MyMessagess };