import React from 'react';
import {Image} from 'react-bootstrap';
import onClickOutside from "react-onclickoutside";
import _ from 'lodash';

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
                            movies.map(movie => (
                                <React.Fragment>
                                    <div className="movie">
                                        <Image src={movie.Poster} rounded />
                                        {_.get(movie, 'Title', '-')}
                                    </div>
                                    <hr />
                                </React.Fragment>
                            ))
                        }
                    <p>Search more on browse..</p>
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
