// src/services/AttendanceService.js
import { db } from './firebaseConfig';
import { 
  collection,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp 
} from 'firebase/firestore';

class AttendanceService {
  constructor() {
    this.db = db;
  }

  async getDailyRecords(employeeId, startDate, endDate) {
    try {
      const dailyRecordsRef = collection(db, 'attendance', employeeId, 'daily_records');
      const q = query(
        dailyRecordsRef,
        where('date', '>=', startDate),
        where('date', '<=', endDate),
        orderBy('date', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const records = [];

      querySnapshot.forEach((doc) => {
        records.push({
          id: doc.id,
          ...doc.data(),
          activities: this._processActivities(doc.data().activities)
        });
      });

      return this._organizeRecordsByDate(records);
    } catch (error) {
      throw new Error(`Failed to fetch attendance records: ${error.message}`);
    }
  }

  _processActivities(activities) {
    return activities.map(activity => ({
      ...activity,
      timestamp: activity.timestamp instanceof Timestamp 
        ? activity.timestamp.toDate() 
        : new Date(activity.timestamp),
      date: activity.date instanceof Timestamp 
        ? activity.date.toDate() 
        : new Date(activity.date)
    }));
  }

  _organizeRecordsByDate(records) {
    const organizedRecords = {};
    
    records.forEach(record => {
      const dateKey = record.date.toISOString().split('T')[0];
      if (!organizedRecords[dateKey]) {
        organizedRecords[dateKey] = {
          date: record.date,
          activities: []
        };
      }
      organizedRecords[dateKey].activities.push(...record.activities);
    });

    // Sort activities by timestamp
    Object.values(organizedRecords).forEach(record => {
      record.activities.sort((a, b) => a.timestamp - b.timestamp);
    });

    return Object.values(organizedRecords);
  }

  getAttendanceStatus(activities) {
    if (!activities || activities.length === 0) return 'Tidak Hadir';
    
    const lastActivity = activities[activities.length - 1];
    return lastActivity.type;
  }

  calculateWorkDuration(activities) {
    if (!activities || activities.length < 2) return '0 jam';
    
    const checkIn = activities.find(a => a.type === 'Masuk');
    const checkOut = activities.find(a => a.type === 'Pulang');
    
    if (!checkIn || !checkOut) return '0 jam';
    
    const duration = (checkOut.timestamp - checkIn.timestamp) / (1000 * 60 * 60);
    return `${duration.toFixed(2)} jam`;
  }
}

const attendanceServiceInstance = new AttendanceService();
export default attendanceServiceInstance;