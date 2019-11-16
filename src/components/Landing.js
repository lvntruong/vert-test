import React from 'react';
import { getAllUser } from '../actions/user.actions';

export default function Landing(props) {

    getAllUser()
    return (
        <p>Welcome!</p>
    )
}