import React from 'react';
import {Container, Image, Spinner} from 'react-bootstrap';
import _ from 'lodash';

import Endpoint from "../common/endpoint/endpoint";

import './Details.scss';

const MOCK_DATA = {"Title":"Joker","Year":"2019","Rated":"R","Released":"04 Oct 2019","Runtime":"122 min","Genre":"Crime, Drama, Thriller","Director":"Todd Phillips","Writer":"Todd Phillips, Scott Silver, Bob Kane (based on characters created by), Bill Finger (based on characters created by), Jerry Robinson (based on characters created by)","Actors":"Joaquin Phoenix, Robert De Niro, Zazie Beetz, Frances Conroy","Plot":"In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.","Language":"English","Country":"USA, Canada","Awards":"Won 2 Oscars. Another 93 wins & 198 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.5/10"},{"Source":"Rotten Tomatoes","Value":"68%"},{"Source":"Metacritic","Value":"59/100"}],"Metascore":"59","imdbRating":"8.5","imdbVotes":"748,514","imdbID":"tt7286456","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"}

class Details extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            isLoading: false
        };
    }

    componentDidMount() {
        this.setState({
            data: MOCK_DATA
        });
    }

    render() {
        const {data} = this.state;

        if (_.isEmpty(data)) {
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
                    <h3>{data.Title}</h3>
                    {data.Plot}
                </div>
            </Container>
        );
    }
}

export {Details};