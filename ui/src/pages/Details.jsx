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

import Endpoint from "../common/endpoint/endpoint";
import {getUrlParamValue} from "../constants/constants";

import './Details.scss';

class Details extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            isLoading: true
        };
    }

    componentDidMount() {
        const urlParam = getUrlParamValue('id');
        const endpointParams = {
            id: urlParam
        };

        Endpoint.api.searchMovies(endpointParams).then(response => {
            this.setState({
                data: response,
                isLoading: false
            });
        })
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
        const {data, isLoading} = this.state;
        const {userLogged} = this.props;

        if (isLoading) {
            return (
                <div className="loader-container">
                    <Spinner animation="border" role="status" />
                </div>
            );
        }

        return (
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
                    <div className="mb-5">{data.Plot}</div>
                    {userLogged && <Button onClick={this.addMovieToWatchlist}>Add movie to your watchlist</Button>}
                </div>
            </Container>
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