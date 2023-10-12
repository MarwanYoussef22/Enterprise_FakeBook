import React, { useEffect } from 'react';

const Employee = (props) => {
    const { signedInEmployee, id, firstName, lastName, phoneNumber, job, location, managerID, photoUrl } = props;

    return (
        <div className='employee-card'>
            <p>signedInEmployee: {signedInEmployee}</p>
            <p>   id: {id}</p>
            <p>   firstName: {firstName}</p>
            <p>   lastName: {lastName}</p>
            <p>  phoneNumber: {phoneNumber}</p>
            <p>  job: {job}</p>
            <p>  location: {location}</p>
            <p>  managerID: {managerID}</p>
            <img src={photoUrl} alt="Profile" />
        </div>
    );
};

export default Employee;