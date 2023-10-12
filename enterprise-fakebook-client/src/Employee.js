import React, { useEffect } from 'react';

const Employee = (props) => {
    const { signedInEmployee, id, firstName, lastName, phoneNumber, job, location, managerID, photoUrl } = props;

    return (
        <div className='employee-card'>
            <p>
                signedInEmployee: {signedInEmployee}
                id: {id}
                firstName: {firstName}
                lastName: {lastName}
                phoneNumber: {phoneNumber}
                job: {job}
                location: {location}
                managerID: {managerID}
            </p>
            <img src={photoUrl} alt="Profile" />
        </div>
    );
};

export default Employee;