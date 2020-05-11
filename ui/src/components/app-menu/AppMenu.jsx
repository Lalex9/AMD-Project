import React from 'react';
import {
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button
} from 'react-bootstrap';
import _ from 'lodash';

import {MovieResults} from '../popups/MovieResults';
import Endpoint from '../../common/endpoint/endpoint';

import './AppMenu.scss';

class AppMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMovieResult: false,
            moviesResult: []
        }
    }

    handleMovieSearch = (event) => {
        const formInput = event.currentTarget.elements[0];
        const endpointParams = {
            title: _.get(formInput, 'value', null)
        }

        Endpoint.api.searchMovies(endpointParams).then(response =>
            this.setState({
                moviesResult: _.get(response, 'Search', []),
                showMovieResult: true
            })
        );
    };

    closePopover = () => {
        this.setState({
            showMovieResult: false,
            moviesResult: []
        });
    }

    render() {
        const {showMovieResult, moviesResult} = this.state;

        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>AMD</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <NavDropdown title="Menu" id="basic-nav-dropdown">
                        <NavDropdown.Item>Watch list</NavDropdown.Item>
                        <NavDropdown.Item>Ratings</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Form className="bttn" inline onSubmit={this.handleMovieSearch}>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        {showMovieResult && <MovieResults closePopover={this.closePopover} movies={moviesResult} />}
                        <Button type="submit" variant="outline-success">Search</Button>
                    </Form>
                    <Button type="submit" variant="outline-success">Log in</Button>
                    <Button type="submit" variant="outline-success">Sign up</Button>
                </Navbar.Collapse>
            </Navbar>
        );
        
    }
}

export {AppMenu};
