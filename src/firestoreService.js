import { db } from './firebaseConfig';
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

class FirestoreService {
  static async fetchCollectionData(collectionName, options = {}) {
    try {
      const collectionRef = collection(db, collectionName);
      let q = collectionRef;

      if (options.where) {
        q = query(collectionRef, where(options.where.field, options.where.operator, options.where.value));
      }

      if (options.orderBy) {
        q = query(q, orderBy(options.orderBy.field, options.orderBy.direction));
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
    } catch (error) {
      console.error('Error fetching collection data:', error);
      throw error;
    }
  }
}

export default FirestoreService;