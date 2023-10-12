import React, { useEffect, useState } from 'react';
import Employee from './Employee';

const EmployeeProfile = (props) => {
    const { signedInEmployee, choosenEmployee } = props;
    cosnt[employeeData, setEmployeeData] = useState(null)

    useEffect(() => {
        //fetch employee information and setEmployeeData
    }, [])


    return (<div>
        {/* show employee information */}
        <p>signedInEmployee: {signedInEmployee}</p>
        <p>   id: {employeeData?.id}</p>
        <p>   firstName: {employeeData?.first_name}</p>
        <p>   lastName: {employeeData?.last_name}</p>
        <p>  phoneNumber: {employeeData?.phone_number}</p>
        <p>  job: {employeeData?.job_role}</p>
        <p>  location: {employeeData?.work_location}</p>
        <p>  managerID: {employeeData?.manager_id}</p>
        <img src={employeeData?.photo_url} alt="Profile" />
        {/* only show salary to HR or manager hierarchy */}
        <p>  Salary: {employeeData?.salary}</p>
    </div>);


}

export default EmployeeProfile;