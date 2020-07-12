import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, isGoogleSignIn, homeButton , ...otherProps }) => {
    return (
        <button className={`${homeButton ? 'home-button' : ''} custom-button`} {...otherProps} >
            {children}
        </button>
    )
}

export default CustomButton;