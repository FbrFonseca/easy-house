import { inject, Injectable } from '@angular/core';
import { Firestore, collectionData, collection, query, where, setDoc, addDoc, getDoc, doc, updateDoc, arrayRemove, arrayUnion, docData } from '@angular/fire/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Ad } from '../models/ad.model';
import { getDocs } from 'firebase/firestore';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private firestore = inject(Firestore);
  // had no time to complete that
  // getBookmarkedAds(userId: string): Observable<Ad[]> {
  //   return this.firestore
  //     .collection('Bookmarks', (ref) => ref.where('userId', '==', userId))
  //     .snapshotChanges()
  //     .pipe(
  //       map((actions) =>
  //         actions.map((a) => {
  //           const data = a.payload.doc.data() as any;
  //           return data.adIds || [];
  //         })
  //       ),
  //       switchMap((adIds) => {
  //         const adsCollection = collection(this.firestore, 'Ads');
  //         const adQueries = adIds.map((adId: string) => 
  //           getDocs(query(adsCollection, where('id', '==', adId)))
  //         );
  //         return forkJoin(adQueries).pipe(
  //           map((snapshots) => {
  //             return snapshots.map((snapshot) => {
  //               const ad = snapshot.docs[0]?.data() as Ad;
  //               return { ...ad };
  //             });
  //           })
  //         );
  //       })
  //     );
  // }

  async addBookmark(userId: string, adId: string): Promise<void> {
    const docRef = doc(this.firestore, 'Bookmarks', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        adIds: arrayUnion(adId),
      });
    } else {
      await setDoc(docRef, {
        adIds: [adId],
      });
    }
  }

  async removeBookmark(userId: string, adId: string): Promise<void> {
    const docRef = doc(this.firestore, 'bookmarks', userId);
    await updateDoc(docRef, {
      adIds: arrayRemove(adId),
    });
  }
}

