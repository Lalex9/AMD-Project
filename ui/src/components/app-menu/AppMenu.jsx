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

import './AppMenu.scss';

class AppMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            moviesResult: []
        }
    }

    handleMovieSearch = (event) => {
        const formInput = event.currentTarget.elements[0];
        const searchQuery = _.get(formInput, 'value', null);

        fetch(`http://localhost:8080/searchMovie?title=${searchQuery}`).then(response => response.json())
            .then(data => this.setState({
                moviesResult: _.get(data, 'Search', [])
            }));
    };

    render() {
        
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>AMD</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link>Menu</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item>Action</NavDropdown.Item>
                        <NavDropdown.Item>Another action</NavDropdown.Item>
                        <NavDropdown.Item>Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>Separated link</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Form inline onSubmit={this.handleMovieSearch}>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        {!_.isEmpty(this.state.moviesResult) && (
                            <div className="film-results">
                                {
                                    this.state.moviesResult.map(movie => (
                                        <div className="movie">
                                            {_.get(movie, 'Title', '-')}    
                                        </div>
                                    ))
                                }
                            </div>
                        )}
                        <Button type="submit" variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export {AppMenu};
