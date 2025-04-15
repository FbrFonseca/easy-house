import { inject, Injectable } from '@angular/core';
import { Firestore, collectionData, collection, setDoc, addDoc, doc, docData } from '@angular/fire/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Ad } from '../models/ad.model';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  private firestore = inject(Firestore)

  getAllAds(): Observable<Ad[]> {
    const adsRef = collection(this.firestore, 'Ads');
    return collectionData(adsRef, {idField: "id"}) as Observable<Ad[]>;
  }

  getAdById(adId: string): Observable<Ad> {
    const adDoc = doc(this.firestore, `ads/${adId}`);
    return docData(adDoc, { idField: 'id' }) as Observable<Ad>;
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
