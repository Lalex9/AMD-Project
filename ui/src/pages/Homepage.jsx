import React from 'react';
import {
    Container,
    CardDeck,
    Carousel
} from 'react-bootstrap';
import {MovieCard} from "../components/movie-card/MovieCard";


class Homepage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Carousel>
                    <Carousel.Item>
                        <img id='picture' className="d-block w-100" src={require('../static/bond.jpg')} alt="First slide" />
                    </Carousel.Item>
                </Carousel>
                <Container fluid>
                    <h3>Trending Movies</h3>
                    <CardDeck>
                        <MovieCard title={'Joker'} img={require('../static/joker.jpg')} description={'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society'} />
                        <MovieCard title={'Parasite'} img={require('../static/parasite.jpg')} description={'Greed and class discrimination threaten the newly formed symbiotic relationship between two clans.'} />
                        <MovieCard title={'Knives out'} img={require('../static/knivesout.jpg')} description={'A detective investigates the death of a patriarch of an eccentric, combative family.'} />
                    </CardDeck>
                </Container>
                <br />
            </React.Fragment>
        );
    }
}

export {Homepage};