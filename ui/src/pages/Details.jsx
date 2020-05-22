import React from 'react';
import {Container, Image, Spinner} from 'react-bootstrap';
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    EmailIcon,
    FacebookIcon,
    LinkedinIcon
} from 'react-share';

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

    render() {
        const {data, isLoading} = this.state;

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
                    {data.Plot}
                </div>
            </Container>
        );
    }
}

export {Details};