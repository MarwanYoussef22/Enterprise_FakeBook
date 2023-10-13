import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './EmployeeProfile.css'
// import Employee from './Employee';

const EmployeeProfile = (props) => {
    const { signedInEmployee, choosenEmployee } = props;

    const [employeeData, setEmployeeData] = useState(null);
    const [signedInEmployeeData, setSignedInEmployeeData] = useState(null);
    // const [managerData, setManagerData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        if (choosenEmployee && signedInEmployee) {
            await fetch(`/employees/${choosenEmployee}`, 
            {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                  "signedInEmployee": signedInEmployee
                })
            }).then((response) => response.json())
                .then((data) => {
                    setEmployeeData(data.employee);
                })
                .catch((error) => {
                    console.log(`Error getting employee data for employee id.: ${choosenEmployee}`, error);
                    setIsLoading(false);
                    setError('Cannot get employee data.');
                });

            // await fetch(`/employees/${signedInEmployee}`)
            //     .then((response) => response.json())
            //     .then((data) => {
            //         setSignedInEmployeeData(data);
            //     })
            //     .catch((error) => {
            //         console.log(`Error getting employee data for employee id.: ${signedInEmployee}`, error);
            //         setIsLoading(false);
            //         setError('Cannot get employee data.');
            //     });
        }

        // if (employeeData?.manager_id) {
        //     await fetch(`/employees/${employeeData.manager_id}`)
        //         .then((response) => response.json())
        //         .then((data) => {
        //             setManagerData(data);
        //             setIsLoading(false);
        //         })
        //         .catch((error) => {
        //             console.log(`Error getting manager data for employee id.: ${choosenEmployee}`, error);
        //             setIsLoading(false);
        //             setError('Cannot get manager data.');
        //         });
        // } else {
        //     setIsLoading(false);
        // }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchData();
    }, [])

    return (
        <div className='profile-container'>
            <Link to="/search">
                <button>Back</button>
            </Link>
            <div className='profile-card'>
                <img src={employeeData?.photo_url} alt="Profile" />
                <div className='profile-info'>
                    <p className='profile-name'>{employeeData?.first_name} {employeeData?.last_name}</p>
                    <p>{employeeData?.job_role}</p>
                    <p>{employeeData?.phone_number}</p>
                    <p>  location: {employeeData?.work_location}</p>
                    {signedInEmployeeData?.job === 'Human Resource Manager' || (employeeData?.manager && signedInEmployeeData?.id === employeeData?.manager) ? (
                        <p>  Salary: {employeeData?.salary}</p>
                    ) : null}
                    {employeeData?.manager_id ? (
                        <p>  manager ID: {employeeData?.manager_id}</p>
                    ) : null}
                </div>
                
                {/* {employeeData?.manager_id && managerData ? (<div>
            <p> Manager: </p>
            <Employee
                key={managerData?.id}
                onEmployeeClick={() => { }}
                //   onEmployeeClick={onSelectEmployee}
                id={managerData?.id}
                firstName={managerData?.first_name}
                lastName={managerData?.last_name}
                job={managerData?.job_role}
                location={managerData?.work_location}
                photoUrl={managerData?.photo_url}
            />
        </div>) : null} */}
            </div>
        </div>);
}

export default EmployeeProfile;