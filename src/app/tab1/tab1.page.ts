import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { onAuthStateChanged } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import {
  IonButton,
  IonButtons,
  IonIcon,
  IonContent,
  IonHeader,
  IonSpinner,
  IonList,
  IonItem } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, bookmarks, chatbubble } from 'ionicons/icons';
import { AdCardComponent } from '../widgets/ad-card/ad-card.component';
import { Ad } from '../models/ad.model';
import { AdService } from '../services/ad.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonList,
    IonItem,
    IonSpinner,
    AdCardComponent,
    IonHeader,
    CommonModule,
    IonContent,
    IonButton,
    IonButtons,
    IonIcon,
  ],
})
export class Tab1Page implements OnInit {
  private navCtrl = inject(NavController);
  private adService = inject(AdService);
  private auth = inject(Auth);

  ads: Ad[] = [];
  userId: string = "";
  loading = true;

  constructor() {
    addIcons({ bookmarks, add, chatbubble });
  }

  ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.userId = user.uid;
        await this.fetchUserAds();
      } else {
        console.log("user not logged in");
        this.loading = false;
      }
    })
  }

  fetchUserAds() {
    if (this.userId) {
      this.loading = true;
      this.adService.getAdsByUser(this.userId).subscribe((ads) => {
        this.ads = ads;
        this.loading = false;
      })
    } else {
      console.log("no user logged");
    }
  }

  goToBookmarks() {
    this.navCtrl.navigateForward("/bookmarked-ads")
  }

  createAd() {
    this.navCtrl.navigateForward("/create-ad");
  }

  goToMyBookings() {
    this.navCtrl.navigateForward("/my-bookings");
  }
}
