import { auth } from '../services/firebaseConfig';
import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

class AuthService {
  login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      throw new Error('Authentication failed: ' + error.message);
    }
  };

  logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error('Logout failed: ' + error.message);
    }
  };

  onAuthStateChanged = (callback) => {
    return onAuthStateChanged(auth, callback);
  };
}

const authService = new AuthService();
export default authService;export const useAuth = () => {
    // implementation
};