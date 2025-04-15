import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonImg, IonIcon, IonButtons, IonButton, IonCard } from "@ionic/angular/standalone";
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { bookmarkOutline, chatbubblesOutline, eyeOutline, returnUpBack } from 'ionicons/icons';
import { Ad } from 'src/app/models/ad.model';
@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.scss'],
  imports:[CommonModule ,IonCard, IonImg, IonButtons, IonButton, IonIcon]
})
export class AdCardComponent {

  @Input() ad?: Ad;
  
  currentImageIndex = 0;

  constructor(private navCtrl: NavController) {
    addIcons({eyeOutline, chatbubblesOutline, bookmarkOutline})

  }

  get currentImage(): string {
    return this.ad?.images?.[this.currentImageIndex] || "";
  }

  nextImage() {
    if (!this.ad?.images?.length) return;
    this.currentImageIndex = (this.currentImageIndex + 1) % this.ad.images.length;
  }

  prevImage() {
    if (!this.ad?.images?.length) return;
    this.currentImageIndex = (this.currentImageIndex - 1) % this.ad.images.length;
  }
  
  openAd(adId: string | undefined) {
    console.log("Opening ad with ID:", adId);
    if (adId) {
      this.navCtrl.navigateForward(`/ad-page/${adId}`);
    }
  }
  
  

  bookViewing() {

  }

  addBookmark() {
    
  }


}
