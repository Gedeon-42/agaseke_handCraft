// Tab.js
import React from 'react';

const PuppyTab = ({ label, isActive, onClick }) => {
    return (
        <button
            className={`tab-button ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};



export default PuppyTab
