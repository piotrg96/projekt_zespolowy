import React from 'react';
import {Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap'
import { userActions } from '../../_actions';
import Notifications from '../Notifications';
import { Navbar } from '../Navbar';

class SendMessage extends React.Component {

    constructor(props)
    {
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

    handleChange(e)
    {
        const{ name, value } = e.target;
        const{ sendMessage } = this.state;
        this.setState({
            sendMessage:{
                ...sendMessage,
                [name]: value
            }
        });
    }

    handleSubmit(e)
    {
        e.preventDefault();
        const { sendMessage } = this.state;
        userActions.userMessage(sendMessage);
    }

    render()
    {
        const { sendMessage } = this.state
        const { users } = this.props.location.state;
        sendMessage.userTo = users.userName;

        return(
            <div >
                <Notifications/>
                <Navbar concreteUser={users}/>
                <Container className="bg-secondary mt-4 py-1 rounded">
                    <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Form name="form" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label>Od</Label>
                        <Input type="text" className="form-control" name="userTo" value={sendMessage.userTo} onChange={this.handleChange} disabled/>
                        <Label>Adresat</Label>
                        <Input type="text" className="form-control" name="userFrom" value={sendMessage.userFrom} onChange={this.handleChange} placeholder="podaj imie i nazwisko"/>
                        </FormGroup>
                        <FormGroup>
                        <Label>Tytuł</Label>
                        <Input type="text" className="form-control" name="topic" value={sendMessage.topic} onChange={this.handleChange} placeholder="tytuł wiadomości"/>
                        </FormGroup>
                        <FormGroup>
                        <Label>Wiadomość</Label>
                        <Input type="textarea" className="form-control" name="content" value={sendMessage.content} onChange={this.handleChange} placeholder="treść wiadomości" wrap="hard" maxLength="255"/>
                        </FormGroup>
                        <FormGroup>
                        <button className="btn btn-primary">Wyślij</button>
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