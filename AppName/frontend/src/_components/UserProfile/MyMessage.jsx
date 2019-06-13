import React from 'react';
import './Messages.css';
import { Link } from 'react-router-dom';

class MyMessage extends React.Component {
    
    render() {   
    const myMsg = this.props;
    return (
        <div className="anymessage container mb-3 border border-success rounded">
            <div className="row">
            <div className="col-md-10">
                <div className="row">
                <div className="usermsg col-md-12">
                    <div className="h3"><b>Nadawca:</b> { myMsg.userFrom }</div></div>
                </div>
                <div className="row">
                <div className="titlemsg col-md-12">
                    <div className="h3 "><b>Tytuł:</b> { myMsg.topic }</div></div>
                </div>
                <div className="row">
                <div className="contetmsg col-md-12">
                    <div className="h5 text-wrap">{ myMsg.content }</div></div>
                </div>
                </div>
                <div className="odpowiedz col-md-2">
                
                <Link to={{ pathname: '/sendMessage', state: { advUser: myMsg.userFrom, users: myMsg.userTo}}} className="btn btn-light">Odpowiedz</Link>
                </div>
                </div>
        </div>
    );}
}

export { MyMessage };
