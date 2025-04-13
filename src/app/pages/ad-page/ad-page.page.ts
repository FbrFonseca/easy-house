import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonItem, IonList, IonButton, IonButtons, IonBackButton, IonIcon, IonLabel, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { locationOutline, pricetagOutline, bedOutline, waterOutline, eyeOutline, bookmarkOutline, chatbubblesOutline } from 'ionicons/icons';

@Component({
  selector: 'app-ad-page',
  templateUrl: './ad-page.page.html',
  styleUrls: ['./ad-page.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonImg, IonIcon, IonLabel, IonText ]
})

export class AdPagePage implements OnInit {

  adId: string = '';
  price: number = 0;
  bedrooms: number = 0;
  toilets: number = 0;
  views: number = 0;
  bookmarks: number = 0;

  constructor(private route: ActivatedRoute) {
    addIcons({locationOutline,pricetagOutline,bedOutline,waterOutline,eyeOutline,bookmarkOutline,chatbubblesOutline});
   }

  ngOnInit() {
    const adId = this.route.snapshot.paramMap.get('id');
    console.log("AD Id: ", adId);
  }

}
