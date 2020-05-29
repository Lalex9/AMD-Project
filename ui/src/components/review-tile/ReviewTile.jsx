import React from 'react';

const Star = ({selected = false}) => (
    <div className={(selected) ? "star selected" : "star"} />
);

class ReviewTile extends React.Component {
    render() {
        const {userReview} = this.props;

        return (
            <div>
                <div className="star-rating vcenter">
                    {[1,2,3,4,5].map((n, i) =>
                        <Star key={i} selected={i < userReview.rating} />
                    )}
                    <p>{userReview.rating} of 5 stars</p>
                </div>
                <br />
                <div>{userReview.reviewText}</div>
            </div>
        );
    }
}

export {ReviewTile, Star};