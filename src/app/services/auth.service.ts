import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { browserLocalPersistence, getAuth, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private app = initializeApp(environment.firebase)
  private auth = getAuth(this.app);

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
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
}
