import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {Formik} from 'formik';

import Endpoint from '../../common/endpoint/endpoint';

class LoginModal extends React.Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Login
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        <b>Fill in the form bellow to login.</b>
                    </p>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Email is required!';
                            } else if (!values.password) {
                                errors.password= 'Password is required!'
                            }

                            return errors;
                        }}
                        onSubmit={(values) => {
                            Endpoint.api.login(values).then(response => {
                                this.props.setUserState(true);
                                this.props.onHide();
                            }).catch(error => {

                            });
                        }} >
                        {(props) => (
                            <Form onSubmit={props.handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email"
                                                  id="email"
                                                  label="email"
                                                  isInvalid={props.touched.email && props.errors.email}
                                                  value={props.values.email}
                                                  onChange={props.handleChange}
                                                  onBlur={props.handleBlur} />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password"
                                                  id="password"
                                                  label="password"
                                                  isInvalid={props.touched.password && props.errors.password}
                                                  value={props.values.password}
                                                  onChange={props.handleChange}
                                                  onBlur={props.handleBlur} />
                                </Form.Group>
                                <Button variant="primary" type="submit" disabled={props.isSubmitting}>
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        );
    }
}

export {LoginModal};
