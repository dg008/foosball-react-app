import React, { Component } from 'react';
import { control } from 'react-validation';
import { FormControl } from 'react-bootstrap';

const MyInput = ({ error, isChanged, isUsed, ...props }) => (
    <div>
        <FormControl { ...props} />
        {isChanged && isUsed && error}
    </div>
);

const ValidatedInput = control(MyInput);
export default ValidatedInput;