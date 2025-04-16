import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonImg, IonIcon, IonButtons, IonButton, IonCard } from "@ionic/angular/standalone";
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { bookmarkOutline, chatbubblesOutline, eyeOutline, returnUpBack } from 'ionicons/icons';
import { Ad } from 'src/app/models/ad.model';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.scss'],
  imports:[CommonModule ,IonCard, IonImg, IonButton]
})
export class AdCardComponent {

  private authService = inject(AuthService);
  private bookmarkService = inject(BookmarkService);

  @Input() ad?: Ad;
  
  userId: string = "";
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

  async toggleBookmark(event: Event) {
    event.stopPropagation();

    const user = this.authService.getCurrentUser();
    if (!user || !this.ad) return;

    this.userId = user.uid;

    if (this.ad?.bookmarked) {
      await this.bookmarkService.removeBookmark(this.userId, this.ad.id!);
      this.ad.bookmarked = false;
    } else {
      await this.bookmarkService.addBookmark(this.userId, this.ad?.id!);
      this.ad.bookmarked = true;
    }
  }
  
  

  bookViewing() {

  }


}
