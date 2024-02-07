import React from 'react';

const BackButton = () => {
  
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <button className="back-button"  onClick={handleGoBack}>
            <i className="fas fa-chevron-left"></i> Back
        </button>
    );
};

export default BackButton;
