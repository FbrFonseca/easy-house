import { Component, inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collectionData, collection, query, where } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { IonHeader, IonToolbar, IonButton, IonButtons, IonTabBar, IonContent, IonBackButton, IonTitle } from '@ionic/angular/standalone';
import { AdCardComponent } from 'src/app/widgets/ad-card/ad-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookmarked-ads',
  templateUrl: './bookmarked-ads.page.html',
  styleUrls: ['./bookmarked-ads.page.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonContent, IonBackButton, IonTitle, AdCardComponent, CommonModule]
})
export class BookmarkedAdsPage implements OnInit {
  private firestore = inject(Firestore);
  private auth = inject(AuthService);


  bookmarkedAds: any[] = [];
  userId?: string;



  constructor() {}

  async ngOnInit() {
    const user = await this.auth.getCurrentUser();
    const userId = user?.uid;
  
    if (userId) {
      const adsRef = collection(this.firestore, 'ads');
      const q = query(adsRef, where('bookmarkedBy', 'array-contains', userId));
      collectionData(q, { idField: 'id' }).subscribe(data => {
        this.bookmarkedAds = data;
      });
    }
  }
}
