import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonItem, IonList, IonButton, IonButtons, IonBackButton, IonIcon, IonLabel, IonText } from '@ionic/angular/standalone';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { addIcons } from 'ionicons';
import { locationOutline, pricetagOutline, bedOutline, waterOutline, eyeOutline, bookmarkOutline, chatbubblesOutline } from 'ionicons/icons';
import { AdService } from 'src/app/services/ad.service';
import { Ad } from 'src/app/models/ad.model';

@Component({
  selector: 'app-ad-page',
  templateUrl: './ad-page.page.html',
  styleUrls: ['./ad-page.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonImg, IonIcon, IonLabel, IonText ]
})

export class AdPagePage implements OnInit, AfterViewInit {
  private route = inject(ActivatedRoute);
  private adService = inject(AdService);


  adId = '';
  ad: any = null;
  currentImageIndex = 0;

  ngAfterViewInit() {
    Swiper.use([Navigation, Pagination]);
    new Swiper('.mySwiper', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  constructor() {
    addIcons({
      locationOutline,
      pricetagOutline,
      bedOutline,
      waterOutline,
      eyeOutline,
      bookmarkOutline,
      chatbubblesOutline
    });
  }

  ngOnInit() {
    this.adId = this.route.snapshot.paramMap.get('id') || '';
    if (this.adId) {
      this.adService.getAdById(this.adId).subscribe(ad => {
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
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.ad.images.length) % this.ad.images.length;
  }
}

