import React from 'react';
import { userService } from '../../_services';
import { Navbar } from '..';
import Notifications from '../Notifications';
import { MyMessagesList } from './MyMessagesList';
import './Messages.css';

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
            
        fetch(`http://localhost:49396/api/Messages/user?user=${this.props.location.state.users.userName}`)
            .then(res => res.json())
            .then(data => this.setState({myMsgs: data}));
    }

    render() {
    
    var anymessage = this.state.myMsgs.length;    


    return (    
        <div>
            <div className="sticky-top">
                <Notifications/>
                <Navbar concreteUser={this.state.user}/>
            </div>
                <div className="row">
                    <div className="col-md-12 min-vh-100">
                    {anymessage == 0 ? <div className="emptymessage h3 col-md-12 py-5 text-center">Twoja skrzynka odbiorcza jest pusta</div> : <MyMessagesList myMsgs={this.state.myMsgs} ktos={this.state.user}/>}
                    </div>
                </div>
        </div>
    );
    }
}

export { MyMessagess };