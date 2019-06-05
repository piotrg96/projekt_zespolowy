import React from 'react';

class MyMessage extends React.Component {
    
    render() {
        
    const myMsg = this.props;

    return (
        <div className="container mb-3 border border-success rounded">
            <div className="row">
            <div className="col-md-12">
                <div className="h2">Wiadomość od: {myMsg.userFrom}</div></div>
            </div>
            <div className="row">
            <div className="col-md-12">
                <div className="h3">Tytuł wiadomości: {myMsg.topic}</div></div>
            </div>
            <div className="row">
            <div className="col-md-12">
                <div className="h4 text-wrap">Treść wiadomości: {myMsg.content}</div></div>
            </div>
        </div>
    );}
}

export { MyMessage };
