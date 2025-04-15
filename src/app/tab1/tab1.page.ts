import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular';
import {
  IonButton,
  IonButtons,
  IonIcon,
  IonContent,
  IonHeader,
  IonList } from '@ionic/angular/standalone';
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

  ads: Ad[] = [];

  constructor() {
    addIcons({ bookmarks, add, chatbubble });
  }

  ngOnInit() {
    this.adService.getAllAds().subscribe((ads) => {
       this.ads = ads;
    });
  }

  showBookmarks() {
    //redirects to bookmarks page that lists all adds bookmarked
  }

  createAd() {
    this.navCtrl.navigateForward("/create-ad");
  }

  showMessages() {
    //redirects to messages page that lists all messages sent to ads
  }
}
