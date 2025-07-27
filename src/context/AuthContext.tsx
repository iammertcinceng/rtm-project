import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import type { User, UserCredential } from 'firebase/auth';
import { db } from '../firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (email: string, password: string) => Promise<UserCredential>;
  registerDoctor: (email: string, password: string) => Promise<UserCredential>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const checkExistingUser = async (email: string) => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        throw new Error('Bu e-posta adresi zaten kullanılıyor. Lütfen farklı bir e-posta adresi kullanın veya giriş yapın.');
      }
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        // User doesn't exist, which is what we want
        return;
      }
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      // Check if user already exists
      await checkExistingUser(email);
      
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      // Firestore'da patients koleksiyonuna yeni belge ekle
      const patientData = {
        email,
        fullName: '',
        tcNo: '',
        fatherName: '',
        address: '',
        phone: '',
        registeredProvince: '',
        registrationDate: '',
        visitReason: '',
        birthDate: '',
        gender: '',
        birthPlace: '',
        emergencyPhone: '',
        userType: 'patient',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      await setDoc(doc(db, 'patients', cred.user.uid), patientData);
      console.log('Yeni hasta kaydı oluşturuldu:', cred.user.uid);
      return cred;
    } catch (error) {
      console.error('Kayıt sırasında hata oluştu:', error);
      throw error;
    }
  };

  const registerDoctor = async (email: string, password: string) => {
    try {
      // Check if user already exists
      await checkExistingUser(email);
      
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      // Firestore'da doctors koleksiyonuna yeni belge ekle
      const doctorData = {
        email,
        fullName: '',
        tcNo: '',
        licenseNumber: '',
        specialization: '',
        phone: '',
        address: '',
        hospital: '',
        department: '',
        experience: '',
        education: '',
        userType: 'doctor',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      await setDoc(doc(db, 'doctors', cred.user.uid), doctorData);
      console.log('Yeni doktor kaydı oluşturuldu:', cred.user.uid);
      return cred;
    } catch (error) {
      console.error('Doktor kayıt sırasında hata oluştu:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, login, register, registerDoctor }}>
      {children}
    </AuthContext.Provider>
  );
}; 