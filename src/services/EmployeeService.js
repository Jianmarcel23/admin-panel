// src/services/EmployeeService.js
import { db } from './firebaseConfig';
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc,
  updateDoc 
} from 'firebase/firestore';

class EmployeeService {
  constructor() {
    this.db = db;
    this.employeesCollection = 'employees';
  }

  async getEmployees() {
    try {
      const employeesRef = collection(this.db, this.employeesCollection);
      const snapshot = await getDocs(employeesRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        password: undefined // Remove password from returned data for security
      }));
    } catch (error) {
      throw new Error(`Failed to fetch employees: ${error.message}`);
    }
  }

  async getEmployeeById(employeeId) {
    try {
      const employeeRef = doc(this.db, this.employeesCollection, employeeId);
      const employeeDoc = await getDoc(employeeRef);
      
      if (!employeeDoc.exists()) {
        throw new Error('Employee not found');
      }

      const employeeData = employeeDoc.data();
      delete employeeData.password; // Remove password for security
      
      return {
        id: employeeDoc.id,
        ...employeeData
      };
    } catch (error) {
      throw new Error(`Failed to fetch employee: ${error.message}`);
    }
  }

  async updateEmployeeProfile(employeeId, profileData) {
    try {
      const employeeRef = doc(this.db, this.employeesCollection, employeeId);
      await updateDoc(employeeRef, profileData);
      return true;
    } catch (error) {
      throw new Error(`Failed to update employee profile: ${error.message}`);
    }
  }

  // Helper method to format employee data for display
  formatEmployeeData(employee) {
    return {
      ...employee,
      fullName: employee.Nama || 'N/A',
      position: employee.jabatan || 'N/A',
      email: employee.email || 'N/A',
      nip: employee.NIP || 'N/A'
    };
  }
}

const employeeServiceInstance = new EmployeeService();
export default employeeServiceInstance;