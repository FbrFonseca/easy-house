import { inject, Injectable } from '@angular/core';
import { Firestore, collectionData, collection, query, where, setDoc, addDoc, doc, docData } from '@angular/fire/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Ad } from '../models/ad.model';
import { getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  private firestore = inject(Firestore);

  getAllAds(): Observable<Ad[]> {
    const adsRef = collection(this.firestore, 'Ads');
    return collectionData(adsRef, {idField: "id"}) as Observable<Ad[]>;
  }

  getAdById(id: string): Observable<Ad> {
    console.log("fetching ad by id:", id);
    const adDoc = doc(this.firestore, `Ads/${id}`);
    return docData(adDoc, { idField: 'id' }) as Observable<Ad>;
  }

  getAdsByUser(userId: string) {
    const adsCollection = collection(this.firestore, 'Ads');
    const adsQuery = query(adsCollection, where('ownerId', '==', userId));
  
    return new Observable<Ad[]>((observer) => {
      getDocs(adsQuery).then((querySnapshot) => {
        const ads: Ad[] = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data() as Ad;
          data.id = docSnap.id; // 👈 Add this line to include the document ID
          ads.push(data);
        });
        observer.next(ads);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  async createAd(ad: any): Promise<void> {
    const adsRef = collection(this.firestore, 'Ads');
    await addDoc(adsRef, {
      ...ad,
      createdAt: Timestamp.now()
    });
  }

  async updateAd(adId: string, ad: any): Promise<void> {
    const adRef = doc(this.firestore, 'Ads', adId);
    await setDoc(adRef, ad, { merge: true });
  }
}
