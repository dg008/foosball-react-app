import React, { Component } from 'react';
import { button } from 'react-validation';
import { Button } from 'react-bootstrap';

const MyButton = ({ hasErrors, formValid=true, ...props }) => {
    return (
        <Button {...props} disabled={!formValid || hasErrors} />
    );
};

const ValidatedButton = button(MyButton);
export default ValidatedButton;