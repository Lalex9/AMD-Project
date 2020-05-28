import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {Formik} from 'formik';

import Endpoint from "../../common/endpoint/endpoint";

class SignupModal extends React.Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sign up
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        <b>Fill in the form bellow to create a new account. <br /> This allows you to add movies to your personal watchlist and leave moview reviews.</b>
                    </p>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Email is required!';
                            } else if (!values.password) {
                                errors.password = 'Password is required!'
                            } else if (values.password !== values.repeatPassword) {
                                errors.repeatPassword = 'The password does not match';
                            }

                            return errors;
                        }}
                        onSubmit={(values) => {
                            Endpoint.api.register(values).then(response => {
                                console.log(response);
                                this.props.onHide();
                            })
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
                                <Form.Group>
                                    <Form.Label>Repeat the password</Form.Label>
                                    <Form.Control type="password"
                                                  id="repeatPassword"
                                                  label="repeatPassword"
                                                  isInvalid={props.touched.repeatPassword && props.errors.repeatPassword}
                                                  value={props.values.repeatPassword}
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

export {SignupModal};
