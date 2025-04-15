import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { browserLocalPersistence, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signOut, User, UserCredential } from 'firebase/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private app = initializeApp(environment.firebase)
  private auth = getAuth(this.app);

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private firestore: Firestore) {
    setPersistence(this.auth, browserLocalPersistence)
    .then(() => {
      onAuthStateChanged(this.auth, (user) => {
        this.userSubject.next(user);
      });
    }).catch((error) => {
      console.error("presistance error:", error);
    })
    
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  async getUserProfileData(uid: string): Promise<any> {
    const userRef = doc(this.firestore, "Users", uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.warn("no user data foiund in db");
      return null;
    }
  }

  async loginUser(email: string, password: string): Promise<User> {
    return signInWithEmailAndPassword(this.auth, email, password)
    .then(userCredential => {
      this.userSubject.next(userCredential.user);
      return userCredential.user;
    });
  }

  async logoutUser(): Promise<void> {
    return signOut(this.auth).then(() => {
      this.userSubject.next(null);
    });
  }

  async registerUser(
    email: string, password: string, name: string, surname: string, phone: string, address: string, occupation: string, photoBase64: string = ""
  ): Promise<void> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const uid = userCredential.user.uid;

    const userData = {
      name,
      surname,
      email,
      phone,
      address,
      occupation,
      avatar: photoBase64
    };

    await setDoc(doc(this.firestore, 'Users', uid), userData);
  }

  async updateUserProfile(uid: string, updateDate: {
    email?: string,
    phone?: string,
    address?: string,
    occupation?: string,
    avatar?: string
  }): Promise<void> {
    const userDocRef = doc(this.firestore, "Users", uid);
    await updateDoc(userDocRef, updateDate);
  }
}
