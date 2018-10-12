import React from 'react';

export default ({ user, index }) => {
    return (
        <li className="item">
            <div className="avatar-wrapper">
                <img src={user.avatar} className="avatar" alt={`${user.first_name} ${user.last_name}`} />
            </div>
            <div className="full-name-wrapper">
                <span className="first_name">{user.first_name}</span> <span className="last_name">{user.last_name}</span>
            </div>
            <button id={`item${index}`} className="delete-user-btn">Delete</button>
        </li>
    )
}