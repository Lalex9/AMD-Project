import React from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import {Formik} from "formik";

import Endpoint from "../../common/endpoint/endpoint";

class AdminModal extends React.Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Manage homepage content
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><b>Fill in the form bellow with movie IDs to change homepage content. All lists are comma separated!</b></p>
                    <Formik
                        initialValues={{trending: '', inCinema: '', recommendations: ''}}
                        validate={values => {
                            const errors = {};
                            if (!values.trending) {
                                errors.email = 'Trending list is required!';
                            } else if (!values.inCinema) {
                                errors.password = 'In cinema list is required!'
                            } else if (!values.recommendations) {
                                errors.repeatPassword = 'The recommendations list is required';
                            }

                            return errors;
                        }}
                        onSubmit={(values) => {
                            const promises = [];
                            Object.keys(values).forEach(key => {
                                promises.push(Endpoint.api.saveList({[key]: values[key]}));
                            });

                            Promise.all(promises).then(responses => {
                                this.props.onHide();
                            });
                        }} >
                        {(props) => (
                            <Form onSubmit={props.handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Trending list</Form.Label>
                                    <Form.Control type="text"
                                                  id="trending"
                                                  label="Trending"
                                                  isInvalid={props.touched.trending && props.errors.trending}
                                                  value={props.values.trending}
                                                  onChange={props.handleChange}
                                                  onBlur={props.handleBlur} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>In cinema list</Form.Label>
                                    <Form.Control type="text"
                                                  id="inCinema"
                                                  label="inCinema"
                                                  isInvalid={props.touched.inCinema && props.errors.inCinema}
                                                  value={props.values.inCinema}
                                                  onChange={props.handleChange}
                                                  onBlur={props.handleBlur} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Recommendations list</Form.Label>
                                    <Form.Control type="text"
                                                  id="recommendations"
                                                  label="recommendations"
                                                  isInvalid={props.touched.recommendations && props.errors.recommendations}
                                                  value={props.values.recommendations}
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

export {AdminModal};
