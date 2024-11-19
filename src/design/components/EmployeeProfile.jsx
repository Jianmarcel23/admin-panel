import React from 'react';

const EmployeeProfile = ({ employee }) => {
  if (!employee) return null;

  return (
    <div className="card">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold">{employee.name}</h2>
          <p className="text-gray-600">{employee.position}</p>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Email</p>
            <p>{employee.email}</p>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-500">Department</p>
            <p>{employee.department}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;