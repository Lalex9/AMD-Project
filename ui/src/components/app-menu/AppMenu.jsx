import React from 'react';
import {
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button
} from 'react-bootstrap';
import {connect} from 'react-redux';
import _ from 'lodash';

import {SignupModal} from "../modals/SignupModal";
import {LoginModal} from "../modals/LoginModal";
import {MovieResults} from '../popups/MovieResults';
import Endpoint from '../../common/endpoint/endpoint';
import {setUser} from "../../state/actions";

import './AppMenu.scss';

class AppMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMovieResult: false,
            moviesResult: [],
            showModals: {
                signup: false,
                login: false
            }
        }
    }

    handleMovieSearch = (event) => {
        event.preventDefault();
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

    toggleModal = (modalId) => {
        this.setState((prevState) => ({
            showModals: {
                ...prevState.showModals,
                [modalId]: !prevState.showModals[modalId]
            }
        }));
    }

    render() {
        const {userLogged, setUser} = this.props;
        const {showMovieResult, moviesResult, showModals} = this.state;
        const toggleSignup = () => this.toggleModal('signup');
        const toggleLogin = () => this.toggleModal('login');

        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>AMD</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {userLogged && (
                        <Nav className="mr-auto">
                            <NavDropdown title="My preferences" id="basic-nav-dropdown">
                                <NavDropdown.Item>Watch list</NavDropdown.Item>
                                <NavDropdown.Item>Ratings</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    )}
                    <Form className="bttn" inline onSubmit={this.handleMovieSearch}>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        {showMovieResult && <MovieResults closePopover={this.closePopover} movies={moviesResult} />}
                        <Button type="submit" variant="outline-success">Search</Button>
                    </Form>
                    {!userLogged ? (
                        <React.Fragment>
                            <Button className="mr-2" onClick={toggleLogin} type="submit" variant="outline-success">Log in</Button>
                            <Button onClick={toggleSignup} type="submit" variant="outline-success">Sign up</Button>
                        </React.Fragment>
                    ) : (
                        <p>Welcome back!</p>
                    )}
                </Navbar.Collapse>
                <SignupModal show={showModals.signup} onHide={toggleSignup} />
                <LoginModal show={showModals.login} onHide={toggleLogin} setUserState={setUser} />
            </Navbar>
        );
        
    }
}

const mapStateToProps = state => {
    return {
        userLogged: state.userLogged
    };
};

function mapDispatchToProps(dispatch) {
    return {
        setUser: (payload) => dispatch(setUser(payload))
    };
}

AppMenu = connect(mapStateToProps, mapDispatchToProps)(AppMenu);
export {AppMenu};
