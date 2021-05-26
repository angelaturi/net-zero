import React, {useState} from 'react'
import Sidebar from './Sidebar'
import User_profile from './user_profile'

const UserProfileContainer = () => {


    return (
        <div> 
            <div className="my-pledges-title">My Pledges</div> 
            <div className="profile-container">
                <Sidebar />
                <User_profile />
            </div>
        </div>
    )
}

export default UserProfileContainer
