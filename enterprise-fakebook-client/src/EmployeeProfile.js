import React, {useEffect} from 'react';

const EmployeeProfile = (props) => {
    const { signedInEmployee, choosenEmployee  } = props;

    useEffect(() => {
        //fetch employee information
    }, [])


    return (<div>
        {/* show employee information */}
        {/* only show salary to HR or manager hierarchy */}
    </div>);
}

export default EmployeeProfile;