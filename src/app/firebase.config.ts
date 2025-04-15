import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

export const firebaseAppProvider = provideFirebaseApp(() => initializeApp(environment.firebase));
export const firestoreProvider = provideFirestore(() => getFirestore());