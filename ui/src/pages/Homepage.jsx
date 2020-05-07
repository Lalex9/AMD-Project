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
                                <Card.Title>Joker</Card.Title>
                                <Card.Text>
                                In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src="holder.js/100px160" />
                            <Card.Body>
                                <Card.Title>Parasite</Card.Title>
                                <Card.Text>
                                Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src="holder.js/100px160" />
                            <Card.Body>
                                <Card.Title>Knives out</Card.Title>
                                <Card.Text>
                                A detective investigates the death of a patriarch of an eccentric, combative family.
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