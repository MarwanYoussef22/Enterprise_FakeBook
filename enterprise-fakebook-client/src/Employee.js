import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Employee = (props) => {
    const { onEmployeeClick, id, firstName, lastName, phoneNumber, job, location, managerID, photoUrl } = props;
    const navigate = useNavigate();

    const onPress = () => {
        onEmployeeClick(id);
        navigate('employee');
    }

    return (
        <div className='employee-card' onClick={onPress}>
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