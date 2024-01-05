import React, { memo, useState } from "react";
import "./courseCard.css";
import { URLS } from "../../urls";
import { useSelector } from "react-redux";
import { images } from '../../components/images';
// import { images } from "../images";

const CourseCard = ({ imageUrl, header, description, rating, review }) => {
    return (
        <div className="course-card-container">
            <div className="image-container">
                <img src={imageUrl} alt={header} className="card-image" />
            </div>
            <div className="card-content">
                <h2 className="card-header">{header}</h2>
                {/* <div className="rating-review">
            <div className="rating-container">
                <span className="rating">{rating}</span>
                <img src={images['rating-star.svg']} alt='rating-star' className="rating-star" />
            </div>
            <span className="review">{review} Reviews</span>
        </div> */}
                <p className="card-desc">{description}</p>
            </div>
        </div>
    );
};

function checkout(productId, token, setLoading) {
    const url = URLS.CHECKOUT(productId);
    setLoading(true);
    fetch(url, {
        headers: {
            token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        method: 'POST',
    })
        .then((res) => res.json())
        .then((res) => {
            window.location.assign(res.checkOutUrl);
        })
        .finally(setLoading(false));
}

export const BuyCourseCard = ({ imageUrl, header, description, productId, isPurchased, startDate }) => {
    const token = useSelector((state) => state.user.userData?.token);
    const [loading, setLoading] = useState(false);

    const calculateDaysLeft = (targetDate) => {
        const [day, month, year] = targetDate.split('-');
        const targetDateObject = new Date(`${year}-${month}-${day}`);
        const currentDate = new Date();
        const timeDifference = targetDateObject.getTime() - currentDate.getTime();
        const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        if (isNaN(daysLeft) || !isFinite(daysLeft)) {
            return 'Coming Soon';
        } else if (daysLeft <= 0) {
            return 'Course Started';
        } else {
            return `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`;
        }
    };
    const truncateText = (text, maxWords) => {
        const words = text.split(' ');
        if (words.length <= maxWords) {
            return text;
        }
        const truncatedText = words.slice(0, maxWords).join(' ') + '...';
        return truncatedText;
    };
    const handleGoogleSigninClick = () => {
        // Set the item in local storage
        localStorage.setItem('login-through-course', 'true');

        // Redirect to the Google Signin URL
        window.location.href = URLS.GOOGLE_SIGNIN;
    };

    return (
        <div className="course-card-container">
            <div className="image-container">
                <img src={imageUrl} alt={header} className="card-image" />
            </div>
            <div className="card-content">
                <div>
                    <h2 className="card-header">{header}</h2>
                    <h4 className="animate-charcter"> {calculateDaysLeft(startDate)}</h4>
                    <p className="card-desc">{truncateText(description, 25)}</p>
                </div>
                <div>
                    {loading ? (
                        <div class="spinner"></div>
                    ) : isPurchased && token ? (
                        <div className="purchased-txt">Purchased</div>
                    ) : !isPurchased && token ? (
                        <button className="buy-now-btn" onClick={() => checkout(productId, token, setLoading)}>
                            <span>
                                <img className="cart-icon" src={images['shopping-cart.svg']} alt="shop-icon" />
                            </span>{' '}
                            Buy Now
                        </button>
                    ) : (
                        <button className="buy-now-btn" onClick={() => handleGoogleSigninClick()}>
                            <span>
                                <img className="cart-icon" src={images['shopping-cart.svg']} alt="shop-icon" />
                            </span>{' '}
                            Buy Now
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(CourseCard);
