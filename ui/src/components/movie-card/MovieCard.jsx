import React from 'react';
import {Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'

import {PATHS} from "../../config/route-config";

import './MovieCard.scss';

class MovieCard extends React.Component {
    render() {
        const {title, img, description, id} = this.props;

        return (
            <Card>
                <Card.Img className="pics" variant="top" src={img} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Link to={{
                        pathname: PATHS.details,
                        search: `?id=${id}`
                    }}>
                        <Button variant="primary">View more info</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}

export {MovieCard};