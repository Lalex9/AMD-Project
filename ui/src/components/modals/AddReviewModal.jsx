import React from 'react';
import {Modal, Form, Button} from 'react-bootstrap';

import Endpoint from "../../common/endpoint/endpoint";

import "./AddReviewModal.scss";

const Star = ({selected = false, onClick}) => (
    <div className={(selected) ? "star selected" : "star"} onClick={onClick} />
);

class AddReviewModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            starsSelected: 1,
            reviewText: ""
        }
    }

    starChange = (starsSelected) => {
        this.setState({starsSelected})
    }

    handleTextInput = (e) => {
        this.setState({
            reviewText: e.target.value
        });
    }

    handleSubmit = () => {
        Endpoint.api.addReview({
            email: this.props.user,
            movieId: this.props.movieId,
            rating: this.state.starsSelected,
            reviewText: this.state.reviewText
        }).then(response => {
            this.props.onHide();
        });
    }

    render() {
        const {starsSelected} = this.state;

        return (
            <Modal show={this.props.show} onHide={this.props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add a review
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><b>Fill in the form bellow to leave a review</b></p>
                    <div className="star-rating vcenter">
                        {[1,2,3,4,5].map((n, i) =>
                            <Star key={i} selected={i < starsSelected} onClick={() => this.starChange(i+1)} />
                        )}
                        <p>{starsSelected} of 5 stars</p>
                    </div>
                    <br />
                    <Form.Group controlId="reviewTextArea">
                        <Form.Label>Review text</Form.Label>
                        <Form.Control onChange={this.handleTextInput} as="textarea" rows="5" />
                    </Form.Group>
                    <Button onClick={this.handleSubmit}>Submit review</Button>
                </Modal.Body>
            </Modal>
        );
    }
}

export {AddReviewModal};
