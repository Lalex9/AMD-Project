import React from 'react';
import {
    Button,
    Container,
    CardDeck,
    Card,
    Jumbotron
} from 'react-bootstrap';

class Homepage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Jumbotron>
                    <h1>Hello, world!</h1>
                    <p>
                        This is a simple hero unit, a simple jumbotron-style component for calling
                        extra attention to featured content or information.
                    </p>
                    <p>
                        <Button variant="primary">Learn more</Button>
                    </p>
                </Jumbotron>
                <Container fluid>
                    <h3>Trending Movies</h3>
                    <CardDeck>
                        <Card>
                            <Card.Img variant="top" src="holder.js/100px160" />
                            <Card.Body>
                                <Card.Title>Movie 1</Card.Title>
                                <Card.Text>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src="holder.js/100px160" />
                            <Card.Body>
                                <Card.Title>Movie 2</Card.Title>
                                <Card.Text>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src="holder.js/100px160" />
                            <Card.Body>
                                <Card.Title>Movie 3</Card.Title>
                                <Card.Text>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </Container>
            </React.Fragment>
        );
    }
}

export {Homepage};