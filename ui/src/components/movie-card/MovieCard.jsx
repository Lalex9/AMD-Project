import React from 'react';
import {Card, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom'

import './MovieCard.scss';
import {PATHS} from "../../config/route-config";

class MovieCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            path: undefined
        };
    }

    viewMore = () => {
        this.setState({
            path: PATHS.details
        });
    }

    render() {
        const {title, img, description} = this.props;
        console.log(this.state.path);
        return (
            <Card>
                {this.state.path && <Redirect to={this.state.path} />}
                <Card.Img className="pics" variant="top" src={img} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Button onClick={this.viewMore} variant="primary">View more info</Button>
                </Card.Body>
            </Card>
        );
    }
}

export {MovieCard};