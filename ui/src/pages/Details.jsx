import React from 'react';
import {Button, Container, Image, Spinner} from 'react-bootstrap';
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    EmailIcon,
    FacebookIcon,
    LinkedinIcon
} from 'react-share';
import {connect} from "react-redux";
import _ from 'lodash';

import {AddReviewModal} from "../components/modals/AddReviewModal";
import Endpoint from "../common/endpoint/endpoint";
import {getUrlParamValue} from "../constants/constants";
import {ReviewTile} from "../components/review-tile/ReviewTile";

import './Details.scss';

class Details extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            reviews: [],
            isLoading: true,
            addReview: false
        };
    }

    fetchData = () => {
        const urlParam = getUrlParamValue('id');
        const endpointParams = {
            id: urlParam
        };

        Endpoint.api.searchMovies(endpointParams).then(response => {
            this.setState({
                data: response,
                isLoading: false
            });
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevState.isLoading && !this.state.isLoading) {
            this.setState({isLoading: true}, () => this.fetchData())
        }
    }

    addMovieToWatchlist = () => {
        const urlParam = getUrlParamValue('id');
        const payload = {
            email: this.props.userEmail,
            movieId: urlParam
        };

        Endpoint.api.addUserWatchlist(payload).then(response => {

        });
    }

    render() {
        const {data, isLoading, addReview, reviews} = this.state;
        const {userLogged, userEmail} = this.props;
        const toggleReviewAdd = () => this.setState((prevState) => (
            {
                ...prevState,
                addReview: !prevState.addReview
            }
        ))

        let reviewsContent = reviews.map(review => <ReviewTile userReview={review} />);

        if (_.isEmpty(reviews)) {
            reviewsContent = (
                <div className="no-data-container">
                    <Image rounded src={require('../static/no-data.png')} />
                </div>
            );
        }

        if (isLoading) {
            return (
                <div className="loader-container">
                    <Spinner animation="border" role="status" />
                </div>
            );
        }

        return (
            <React.Fragment>
                <Container className="general-info" fluid>
                    <Image src={data.Poster} />
                    <div className="general-info-data">
                        <div className="general-info-header">
                            <h3>{data.Title}</h3>
                            <div className="share-icons">
                                <LinkedinShareButton url={window.location.href}>
                                    <LinkedinIcon size={32} round={true} />
                                </LinkedinShareButton>
                                <FacebookShareButton url={window.location.href}>
                                    <FacebookIcon size={32} round={true} />
                                </FacebookShareButton>
                                <EmailShareButton url={window.location.href}>
                                    <EmailIcon size={32} round={true} />
                                </EmailShareButton>
                            </div>
                        </div>
                        <div className="mb-1">{data.Released} - {data.Runtime}</div>
                        <div className="mb-3">Genre: {data.Genre}</div>
                        <div className="mb-2">{data.Plot}</div>
                        <h5 className="mt-4">Ratings</h5>
                        <div className="mt-1">
                            {data.Ratings.map(rating => <div>{` ${rating.Source} - ${rating.Value} `}</div>)}
                        </div>
                        <h5 className="mt-4">Awards</h5>
                        <div className="mt-1">{data.Awards}</div>
                        {userLogged && <Button className="mt-4" onClick={this.addMovieToWatchlist}>Add movie to your watchlist</Button>}
                    </div>
                </Container>
                <br />
                <Container className="reviews">
                    <h4>Latest user reviews</h4>
                    {reviewsContent}
                    {userLogged && (
                        <React.Fragment>
                            <AddReviewModal show={addReview} onHide={toggleReviewAdd} user={userEmail} movieId={getUrlParamValue('id')} />
                            <Button onClick={toggleReviewAdd}>Add review</Button>
                        </React.Fragment>
                    )}
                </Container>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        userEmail: state.userEmail,
        userLogged: state.userLogged
    };
};

Details = connect(mapStateToProps, null)(Details);
export {Details};