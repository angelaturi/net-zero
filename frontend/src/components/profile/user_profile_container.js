import React, {useState} from 'react'
import Sidebar from './Sidebar'
import User_profile from './user_profile'

const UserProfileContainer = () => {


    return (
        <div>
            <User_profile />
            <Sidebar />
        </div>
    )
}

export default UserProfileContainer
