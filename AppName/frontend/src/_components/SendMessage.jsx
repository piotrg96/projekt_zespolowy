import React from 'react';
import {Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap'

class SendMessage extends React.Component {

    render()
    {
        return(
            <div>
                
                <Container className="py-2">
                    <Row>
                    <Col  sm="12" md={{ size: 6, offset: 3 }}>
                    <Form>
                        <FormGroup>
                        <Label>Tytuł</Label>
                        <Input type="text" name="title" placeholder="tytuł wiadomości"/>
                        </FormGroup>
                        <FormGroup>
                        <Label>Wiadomość</Label>
                        <Input type="textarea" name="message" placeholder="treść wiadomości" />
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