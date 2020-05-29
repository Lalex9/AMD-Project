import React from 'react';
import {Modal, Button, Spinner, Image} from 'react-bootstrap';

import Endpoint from '../../common/endpoint/endpoint';
import {ReviewTile} from "../review-tile/ReviewTile";
import _ from "lodash";

class ReviewsModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            reviews: []
        };
    }

    fetchReviews = () => {
        const {user} = this.props;

        Endpoint.api.getUserReviews({user}).then(response => {
            this.setState({
                isLoading: false,
                reviews: response
            })
        });
    }

    removeReview = (reviewData) => {
        const endpointParams = {
            email: reviewData.email,
            movieId: reviewData.movieId
        }

        Endpoint.api.removeReview(endpointParams).then(response => {
            this.setState({
                isLoading: true
            });
        })
    }

    componentDidMount() {
        this.fetchReviews();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((!prevProps.show && this.props.show) || (!prevState.isLoading && this.state.isLoading)) {
            this.fetchReviews();
        }
    }

    render() {
        const {isLoading, reviews} = this.state;

        return (
            <Modal show={this.props.show} onHide={this.props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Your reviews
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLoading ? (
                        <div className="loader-container">
                            <Spinner animation="border" role="status" />
                        </div>
                    ) : (
                        <div className="reviews-container">
                            {
                                _.isEmpty(reviews) ? (
                                    <div className="no-data-container">
                                        <Image rounded src={require('../../static/no-data.png')} />
                                    </div>
                                ) : (
                                    reviews.map(userReview => (
                                        <React.Fragment>
                                            <div className="review">
                                                <div className="mb-1">Movie ID: {userReview.movieId}</div>
                                                <ReviewTile userReview={userReview} />
                                                <br />
                                                <Button onClick={() => this.removeReview(userReview)}>Remove review</Button>
                                            </div>
                                            <hr />
                                        </React.Fragment>
                                    ))
                                )
                            }
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        );
    }
}

export {ReviewsModal};
