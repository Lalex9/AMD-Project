import React from 'react';
import {Modal, Button, Spinner, Image} from 'react-bootstrap';
import _ from "lodash";

import Endpoint from '../../common/endpoint/endpoint';

import "./WatchlistModal.scss";

class WatchlistModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			movies: []
		};
	}

	fetchWatchlistData = () => {
		const {user} = this.props;

		Endpoint.api.getUserWatchlist({user}).then(response => {
			let promises = []
			promises = response.map(movie => Endpoint.api.searchMovies({id: movie}))

			return Promise.all(promises).then(responses => {
				this.setState({
					isLoading: false,
					movies: responses
				})
			})
		});
	}

	removeMovie = (movieData) => {
		const {imdbID} = movieData;
		const endpointParams = {
			email: this.props.user,
			movieId: imdbID
		}

		Endpoint.api.removeUserWatchlist(endpointParams).then(response => {
			this.setState({
				isLoading: true
			});
		})
	}

	componentDidMount() {
		this.fetchWatchlistData();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if ((!prevProps.show && this.props.show) || (!prevState.isLoading && this.state.isLoading)) {
			this.fetchWatchlistData();
		}
	}

	render() {
		const {isLoading, movies} = this.state;

		return (
			<Modal show={this.props.show} onHide={this.props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Your watchlist
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{isLoading ? (
						<div className="loader-container">
							<Spinner animation="border" role="status" />
						</div>
					) : (
						<div className="watchlist-container">
							{
								movies.map(movie => (
									<React.Fragment>
										<div className="movie">
											<Image src={movie.Poster} rounded />
											<div>
												<b>{_.get(movie, 'Title', '-')}</b>
												<br />
												{_.get(movie, 'Plot', '-')}
											</div>
											<Button onClick={() => this.removeMovie(movie)}>Remove movie</Button>
										</div>
										<hr />
									</React.Fragment>
								))
							}
						</div>
					)}
				</Modal.Body>
			</Modal>
		);
	}
}

export {WatchlistModal};
