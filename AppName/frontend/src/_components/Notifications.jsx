import React from 'react';
import styled from 'styled-components';
import ee from 'event-emitter';
import { Icon } from 'react-fa';

const Container = styled.div`
    background-color: #AAA;
    color: white;
    padding: 16px;
    position: absolute;
    top: ${props => props.top}px;
    right: 16px;
    z-index: 999;
    transition: top 0.5s ease;
`;

const emitter = new ee();

export const notify = (msg) => {
    emitter.emit('notification', msg);
}

export default class Notifications extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            top: -100,
            msg: '',
        };

        this.timeout = null;
        emitter.on('notification', (msg) => {
            this.onShow(msg);
        });
    }

    onShow = (msg) => {
        if(this.timeout){
            clearTimeout(this.timeout);
            this.setState({
                top: -100,
            }, () => {
                this.timeout = setTimeout(() => {
                    this.onShowNotification(msg);
                }, 500);
            }); 
        } else {
            this.onShowNotification(msg);
        }
    }

    onShowNotification = (msg) => {
        this.setState({
            top: 16,
            msg
        }, () => {
            this.timeout = setTimeout(() => {
                this.setState({
                    top: -100, 
                });
            }, 3000);
        });
    }

    render(){
        return(
            <Container 
                top={this.state.top}>{this.state.msg} 
                <Icon name="icon" className="fa fa-bell-o"/>
            </Container>
        );
    }
}