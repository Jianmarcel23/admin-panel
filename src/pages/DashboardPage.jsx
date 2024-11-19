import React, { useEffect, useState } from 'react';
import DashboardLayout from '../design/components/DashboardLayout';
import EmployeeProfile from '../design/components/EmployeeProfile';
import { useAuth } from '../services/AuthProvider';
import employeeService from '../services/EmployeeService';

const DashboardPage = () => {
  const { user } = useAuth();
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        if (user) {
          const data = await employeeService.getEmployeeData(user.uid);
          setEmployeeData(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <EmployeeProfile employee={employeeData} />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;