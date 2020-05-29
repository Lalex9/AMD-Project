import React from 'react';
import {Image} from 'react-bootstrap';
import {Link} from "react-router-dom";
import onClickOutside from "react-onclickoutside";
import _ from 'lodash';

import {PATHS} from "../../config/route-config";

import './MovieResults.scss';

class MovieResults extends React.Component {
    myClickOutsideHandler = (evt) => {
        this.props.closePopover();
    }

    render() {
        const {movies} = this.props;

        return (
            <React.Fragment>
                {!_.isEmpty(movies) && (
                    <div className="film-results">
                        {
                            movies.slice(0, 5).map(movie => (
                                <Link to={{
                                    pathname: PATHS.details,
                                    search: `?id=${movie.imdbID}`
                                }}>
                                    <div className="movie">
                                        <Image src={movie.Poster} rounded />
                                        {_.get(movie, 'Title', '-')}
                                    </div>
                                    <hr />
                                </Link>
                            ))
                        }
                    </div>
                )}
            </React.Fragment>
        );

    }
}

let clickOutsideConfig = {
    handleClickOutside: function(instance) {
        return instance.myClickOutsideHandler;
    }
};
MovieResults = onClickOutside(MovieResults, clickOutsideConfig);
export {MovieResults};
