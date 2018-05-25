import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

/**
 * 
 * @param {string[]} winners - The foosball winners for a particular match result
 */
const WinnerList = ({ winners }) => {
    return (            
        <ul className="WinnerList">
            {
                winners.map((item, index) => {
                    return (
                        <li key={index}>{item}</li>
                    )
                })
            }
        </ul>
    )
}

WinnerList.propTypes = {
    winners: PropTypes.arrayOf(String).isRequired,
}

export default WinnerList;