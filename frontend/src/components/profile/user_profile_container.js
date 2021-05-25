import React, {useState} from 'react'
import Sidebar from './Sidebar'
import User_profile from './user_profile'

const User_profile_container = () => {


    return (
        <div>
            <User_profile />
            <Sidebar />
        </div>
    )
}

export default User_profile_container
