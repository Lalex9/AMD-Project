import React from 'react';
import {
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
                    <img id = "picture" src={require('../static/bond.jpg')} alt = "James Bond" />

                </Jumbotron>
                <Container fluid>
                    <h3>Trending Movies</h3>
                    <CardDeck>
                        <Card>
                            <Card.Img className = "pics" variant="top" src={require('../static/joker.jpg')} />
                            <Card.Body>
                                <Card.Title>Joker</Card.Title>
                                <Card.Text>
                                In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img className = "pics" variant="top" src={require('../static/parasite.jpg')} />
                            <Card.Body>
                                <Card.Title>Parasite</Card.Title>
                                <Card.Text>
                                Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img className = "pics" variant="top" src={require('../static/knivesout.jpg')} />
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