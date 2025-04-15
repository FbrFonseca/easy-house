import { Component, inject, OnInit } from '@angular/core';
import { IonMenuButton, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonButton, IonPopover, IonInput, IonButtons, IonLabel } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdCardComponent } from "../widgets/ad-card/ad-card.component";
import { AdService } from '../services/ad.service';
import { Ad } from '../models/ad.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [FormsModule, CommonModule, IonLabel, IonMenuButton, IonButtons, IonMenu, IonInput, IonPopover, IonButton, IonList, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, AdCardComponent]
})
export class Tab2Page implements OnInit {

  private adService = inject(AdService);

  ads: Ad[] = [];


  filters = {
    minPrice: null,
    maxPrice: null,
    bedrooms: null,
    location: '',
  };

  ngOnInit(): void {
    this.loadAds();
  }


  loadAds() {
    this.adService.getAllAds().subscribe({
      next: (ads) => {
        console.log("Fetched ads:", ads);
        this.ads = ads;
      },
      error: (err) => {
        console.error("Error fetching ads:", err);
      },
      complete: () => {
        console.log("Finished fetching ads");
      }
    });    
  }
  
  
}
