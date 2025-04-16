import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonChip, IonHeader, IonTitle, IonToolbar, IonImg, IonItem, IonList, IonButton, IonButtons, IonBackButton, IonIcon, IonLabel, IonText } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Navigation, Pagination } from 'swiper/modules';
import { addIcons } from 'ionicons';
import { locationOutline, pricetagOutline, bedOutline, waterOutline, eyeOutline, bookmarkOutline, chatbubblesOutline, chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { AdService } from 'src/app/services/ad.service';
import { BookingService } from 'src/app/services/booking.service';
import { Ad } from 'src/app/models/ad.model';

@Component({
  selector: 'app-ad-page',
  templateUrl: './ad-page.page.html',
  styleUrls: ['./ad-page.page.scss'],
  standalone: true,
  imports: [IonButton, IonChip, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonIcon, IonLabel, IonText ]
})

export class AdPagePage implements OnInit {
  private route = inject(ActivatedRoute);
  private adService = inject(AdService);
  private bookingService = inject(BookingService);
  private authService = inject(AuthService);



  adId = '';
  ad: any = null;
  currentImageIndex = 0;
  hasBooked = false;

  constructor() {
    addIcons({chevronBackOutline,chevronForwardOutline,locationOutline,pricetagOutline,bedOutline,waterOutline,eyeOutline,bookmarkOutline,chatbubblesOutline});
  }

  ngOnInit() {
    this.adId = this.route.snapshot.paramMap.get('id') || '';
    console.log("ad id: ", this.adId)
    if (this.adId) {
      this.adService.getAdById(this.adId).subscribe(ad => {
        console.log("fetched ad: ", ad)
        this.ad = ad;
      });
    }
  }

  nextImage() {
    if (!this.ad?.images?.length) return;
    this.currentImageIndex = (this.currentImageIndex + 1) % this.ad.images.length;
  }

  prevImage() {
    if (!this.ad?.images?.length) return;
    this.currentImageIndex = (this.currentImageIndex - 1 + this.ad.images.length) % this.ad.images.length;
  }

  async bookViewing() {
    const user = this.authService.getCurrentUser();
    if (!user || !this.adId || this.hasBooked) return;

    const message = `User ${user.email} is interested in viewing this property.`;
    await this.bookingService.createBooking(user.uid, this.adId, message);
    this.hasBooked = true;
    console.log("booking created");
  }
}

