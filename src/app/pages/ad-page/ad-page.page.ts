import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonContent,
  IonChip,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonItem,
  IonList,
  IonButton,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonLabel,
  IonText,
  IonTextarea,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Navigation, Pagination } from 'swiper/modules';
import { addIcons } from 'ionicons';
import {
  locationOutline,
  pricetagOutline,
  bedOutline,
  waterOutline,
  eyeOutline,
  bookmarkOutline,
  chatbubblesOutline,
  chevronBackOutline,
  chevronForwardOutline,
  checkmarkCircleOutline,
} from 'ionicons/icons';
import { AdService } from 'src/app/services/ad.service';
import { BookingService } from 'src/app/services/booking.service';
import { Ad } from 'src/app/models/ad.model';
import { environment } from 'src/environments/environment';

declare var google: any;

@Component({
  selector: 'app-ad-page',
  templateUrl: './ad-page.page.html',
  styleUrls: ['./ad-page.page.scss'],
  standalone: true,
  imports: [
    IonTextarea,
    IonButton,
    IonChip,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonBackButton,
    IonIcon,
    IonLabel,
    IonText,
    IonItem,
  ],
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
  bookingMessage = '';

  constructor() {
    addIcons({
      locationOutline,
      pricetagOutline,
      bedOutline,
      waterOutline,
      chatbubblesOutline,
      checkmarkCircleOutline,
      chevronBackOutline,
      chevronForwardOutline,
      eyeOutline,
      bookmarkOutline,
    });
  }

  ngOnInit() {
    this.adId = this.route.snapshot.paramMap.get('id') || '';
    if (this.adId) {
      this.adService.getAdById(this.adId).subscribe(async (ad) => {
        this.ad = ad;
        try {
          await this.loadGoogleMapsScript();
          this.initMap();
        } catch (err) {
          console.error(err);
        }
      });
    }
  }

  initMap() {
    if (!this.ad?.latitude || !this.ad?.longitude) return;

    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        center: { lat: this.ad.latitude, lng: this.ad.longitude },
        zoom: 15,
        disableDefaultUI: true,
      }
    );

    new google.maps.Marker({
      position: { lat: this.ad.latitude, lng: this.ad.longitude },
      map,
      title: this.ad.title,
      icon: {
        url: 'https://cdn-icons-png.flaticon.com/128/7720/7720526.png',
        scaledSize: new google.maps.Size(40, 40),
      },
    });
  }

  loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).google && (window as any).google.maps) {
        resolve(); // Already loaded
      } else {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject('Google Maps failed to load');
        document.head.appendChild(script);
      }
    });
  }

  loadMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: this.ad.latitude, lng: this.ad.longitude },
      zoom: 15,
    });

    new google.maps.Marker({
      position: { lat: this.ad.latitude, lng: this.ad.longitude },
      map: map,
      title: this.ad.title,
    });
  }

  nextImage() {
    if (!this.ad?.images?.length) return;
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.ad.images.length;
  }

  prevImage() {
    if (!this.ad?.images?.length) return;
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.ad.images.length) %
      this.ad.images.length;
  }

  async submitBooking() {
    const user = this.authService.getCurrentUser();
    console.log('Current message:', this.bookingMessage);
    if (!user || !this.adId || this.hasBooked) return;

    const message =
      this.bookingMessage.trim() ||
      `User ${user.email} is interested in this property.`;

    try {
      await this.bookingService.createBooking(user.uid, this.adId, message);
      this.hasBooked = true;
      this.bookingMessage = '';
      console.log('Booking submitted successfully');
    } catch (error) {
      console.error('Booking failed:', error);
    }
  }

  // async bookViewing() {
  //   const user = this.authService.getCurrentUser();
  //   if (!user || !this.adId || this.hasBooked) return;

  //   const message = `User ${user.email} is interested in viewing this property.`;
  //   await this.bookingService.createBooking(user.uid, this.adId, message);
  //   this.hasBooked = true;
  //   console.log('booking created');
  // }
}
