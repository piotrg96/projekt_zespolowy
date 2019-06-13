import React from 'react';
import {Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap'
import { userActions } from '../../_actions';
import Notifications from '../Notifications';
import { Link } from 'react-router-dom'

class SendMessage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sendMessage: {
            userFrom : '',
            topic: '',
            content: '',
            userTo: '',
            },
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const{ name, value } = e.target;
        const{ sendMessage } = this.state;
        this.setState({
            sendMessage:{
                ...sendMessage,
                [name]: value,
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { sendMessage } = this.state;
        userActions.userMessage(sendMessage);
    }

    render() {
        const { sendMessage } = this.state
        const { users, advUser} = this.props.location.state;
        sendMessage.userFrom = users;
        sendMessage.userTo = advUser;
        
        return(
            <div >
                <Notifications/>
                <Container className="message-background mt-4 py-1 rounded">
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <p className="message-userto">Wiadomość do: {sendMessage.userTo}</p>
                        </Col>
                    </Row>
                    <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Form name="form" onSubmit={this.handleSubmit}>
                        <FormGroup>
                        <Label className="label">Tytuł</Label>
                        <Input type="text" className="form-control" name="topic" value={sendMessage.topic} onChange={this.handleChange} placeholder="tytuł wiadomości"/>
                        </FormGroup>
                        <FormGroup>
                        <Label className="label">Wiadomość</Label>
                        <Input type="textarea" className="comment form-control" name="content" value={sendMessage.content} onChange={this.handleChange} placeholder="treść wiadomości" wrap="hard" maxLength="255"/>
                        </FormGroup>
                        <FormGroup>
                        <Row>
                        <Col md="6">
                            <button className="btn btn-primary btn-block">Wyślij</button>
                        </Col>
                        <Col md="6">
                            <Link to="/" className="btn btn-link btn-block border border-primary">Powrót</Link>
                        </Col>
                        </Row>
                        </FormGroup>
                    </Form>
                    </Col>
                    </Row>
                </Container> 
            </div>
        );
    }
}

export { SendMessage };