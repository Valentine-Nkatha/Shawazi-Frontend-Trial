import React, { useState, useEffect } from 'react';
import SideBar from '../SideBarPwa'; // Adjust the path based on your folder structure

const ParentComponent = () => {
    const [userRole, setUserRole] = useState(null); // Manage user roles dynamically, maybe from an API or context

    useEffect(() => {
        // You can fetch the user role from the server or local storage
        const fetchUserRole = async () => {
            // Example: fetch from an API or get from local storage
            const role = localStorage.getItem('userRole') || 'buyer'; // Default to 'buyer'
            setUserRole(role);
        };

        fetchUserRole();
    }, []);

    if (!userRole) {
        return <p>Loading...</p>; // Display loading while fetching role
    }

    return (
        <div>
            {/* Pass the user role to the SideBar */}
            <SideBar userRole={userRole} />
            <div className="content">
                {/* Content goes here */}
                <h1>Welcome, {userRole}</h1>
            </div>
        </div>
    );
};

export default ParentComponent;
