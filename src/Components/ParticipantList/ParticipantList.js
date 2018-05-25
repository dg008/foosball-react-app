import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

/**
 * 
 * @param {string[]} participants - The foosball participants for a particular
 * match result
 */
const ParticipantList = ({ participants }) => {
    return (
        <ul className="ParticipantList">
            {
                participants.map((item, index) => {
                    return (
                        <li key={index}>{item}</li>
                    )
                })
            }
        </ul>
    )
}

ParticipantList.propTypes = {
    participants: PropTypes.arrayOf(String).isRequired,
}

export default ParticipantList;