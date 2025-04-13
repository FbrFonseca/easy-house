import { Component, OnInit } from '@angular/core';
import { IonImg, IonIcon, IonButtons, IonButton, IonCard } from "@ionic/angular/standalone";
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { bookmarkOutline, chatbubblesOutline, eyeOutline } from 'ionicons/icons';
@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.scss'],
  imports:[IonCard, IonImg, IonButtons, IonButton, IonIcon]
})
export class AdCardComponent implements OnInit {

  constructor(private navCtrl: NavController) {
    addIcons({eyeOutline, chatbubblesOutline, bookmarkOutline})

  }
  
  openAd(adId: string) {
    this.navCtrl.navigateForward(`/ad-page/${adId}`)
  }


  ngOnInit() {}

}
