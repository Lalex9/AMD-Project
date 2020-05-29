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
import {Link} from "react-router-dom";
import _ from 'lodash';

import {SignupModal} from "../modals/SignupModal";
import {LoginModal} from "../modals/LoginModal";
import {WatchlistModal} from "../modals/WatchlistModal";
import {MovieResults} from '../popups/MovieResults';
import {ReviewsModal} from "../modals/ReviewsModal";
import Endpoint from '../../common/endpoint/endpoint';
import {setUser} from "../../state/actions";
import {PATHS} from "../../config/route-config";

import './AppMenu.scss';
import {AdminModal} from "../modals/AdminModal";

class AppMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMovieResult: false,
            moviesResult: [],
            showModals: {
                signup: false,
                login: false,
                watchlist: false,
                reviews: false,
                admin: false
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
    }

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

    handleLogOut = () => {
        this.props.setUser({
            userEmail: "",
            userLogged: false
        });
    }

    render() {
        const {userLogged, setUser, userEmail} = this.props;
        const {showMovieResult, moviesResult, showModals} = this.state;
        const toggleSignup = () => this.toggleModal('signup');
        const toggleLogin = () => this.toggleModal('login');
        const toggleWatchlist = () => this.toggleModal('watchlist');
        const toggleReviews = () => this.toggleModal('reviews');
        const toggleAdmin = () => this.toggleModal('admin');

        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand className="logo">
                    <Link to={PATHS.homepage}>AMD</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {userLogged && (
                        <Nav className="mr-auto">
                            <NavDropdown title="My preferences" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={toggleWatchlist}>Watch list</NavDropdown.Item>
                                <NavDropdown.Item onClick={toggleReviews}>Reviews</NavDropdown.Item>
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
                        <React.Fragment>
                            <Navbar.Text className="mr-2">
                                Welcome back!
                            </Navbar.Text>
                            {userEmail === "admin@admin" && <Button className="mr-2" onClick={toggleAdmin}>Admin modal</Button>}
                            <Button onClick={this.handleLogOut}>Log out</Button>
                        </React.Fragment>
                    )}
                </Navbar.Collapse>
                {userLogged && (
                    <React.Fragment>
                        <AdminModal show={showModals.admin} onHide={toggleAdmin} />
                        <ReviewsModal show={showModals.reviews} onHide={toggleReviews} user={userEmail} />
                        <WatchlistModal show={showModals.watchlist} onHide={toggleWatchlist} user={userEmail} />
                    </React.Fragment>
                )}
                <SignupModal show={showModals.signup} onHide={toggleSignup} />
                <LoginModal show={showModals.login} onHide={toggleLogin} setUserState={setUser} />
            </Navbar>
        );
        
    }
}

const mapStateToProps = state => {
    return {
        userEmail: state.userEmail,
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
