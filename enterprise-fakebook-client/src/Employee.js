import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Employee.css'

const Employee = (props) => {
    const { onEmployeeClick, id, firstName, lastName, job, location, photoUrl } = props;
    const navigate = useNavigate();

    const onPress = () => {
        onEmployeeClick(id);
        navigate('employee');
    }

    return (
        <div className='employee-card' onClick={onPress}>
            <img src={photoUrl} alt="Profile" />
            <div className='employee-information'>
                {/* <p>   id: {id}</p> */}
                    <p className='employee-name'>{firstName} {lastName}</p>
                <p>  {job}</p>
                {/* <p>  location: {location}</p> */}
            </div>
        </div>
    );
};

export default Employee;