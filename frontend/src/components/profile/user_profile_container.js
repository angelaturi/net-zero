import React, {useState} from 'react'
import Sidebar from './Sidebar'
import UserProfile from './user_profile'

const UserProfileContainer = () => {


    return (
        <div> 
            <div className="my-pledges-title">My Pledges</div> 
            <div className="profile-container">
                <Sidebar />
                <UserProfile />
            </div>
        </div>
    )
}

export default UserProfileContainer
