import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdService } from 'src/app/services/ad.service';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import {
  IonSegment,
  IonSegmentButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonInput,
  IonItem,
  IonTextarea,
  IonButton,
  IonRadio,
  IonButtons,
  IonImg, IonBackButton } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  standalone: true,
  selector: 'app-create-ad',
  templateUrl: './create-ad.page.html',
  styleUrls: ['./create-ad.page.scss'],
  imports: [
    IonBackButton,
    IonSegmentButton,
    IonButton,
    IonButtons,
    IonSegment,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonLabel,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonInput,
    IonItem,
    IonTextarea,
    IonImg,
  ],
})
export class CreateAdPage {
  private auth: Auth = inject(Auth);
  private http = inject(HttpClient);
  eircode: string = '';
  userId: string = this.auth.currentUser?.uid || '';
  isLoading: boolean = false;

  ad = {
    title: '',
    adType: '',
    eircode: '',
    description: '',
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    images: [] as string[],
    views: 0,
    bookmarks: 0,
    createdAt: null as Timestamp | null,
    ownerId: this.userId || '',
    latitude: 0,
    longitude: 0,
  };

  constructor(private adService: AdService, private navCtrl: NavController) {}

  onImageSelected(event: any) {
    const files: FileList = event.target.files;
    const readers: Promise<string>[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      readers.push(this.convertToBase64(file));
    }

    Promise.all(readers).then((base64Images) => {
      const total = this.ad.images.length + base64Images.length;
      if (total > 5) {
        alert('Maximum 5 images allowed.');
        return;
      }
      this.ad.images.push(...base64Images);
    });
  }

  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  async submitAd() {
    console.log('Ad being submitted:', this.ad);
    console.log('ad Type: ', this.ad.adType);

    if (!['rent', 'sell'].includes(this.ad.adType)) {
      alert('Please select if the ad is for rent or sale.');
      return;
    }

    if (
      this.ad.title &&
      this.ad.description &&
      this.ad.price &&
      this.ad.images.length &&
      this.ad.adType &&
      this.eircode
    ) {
      try {
        const coords = await this.getCoordinatesFromEircode(this.eircode);
        if (!coords) {
          alert('failed to get location from eircode');
          return;
        }

        this.ad.latitude = coords.lat;
        this.ad.longitude = coords.lng;
        this.ad.eircode = this.eircode;
        this.ad.createdAt = Timestamp.fromDate(new Date());
        this.ad.ownerId = this.userId;

        await this.adService.createAd(this.ad);
        this.navCtrl.back();
      } catch (error) {
        console.error('geocoding failed', error);
        alert(
          'Please fill in all fields and upload at least one but no more than five image, no high-res image.'
        );
      }
    }
  }

  async getCoordinatesFromEircode(eircode: string): Promise<{ lat: number, lng: number } | null> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(eircode + ', Ireland')}&key=${environment.googleMapsApiKey}`;
    try {
      const response: any = await firstValueFrom(this.http.get(url));
      console.log("geocoding API response:", response);
      if (response.status === 'OK' && response.results.length > 0) {
        const location = response.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      }
      return null;
    } catch (err) {
      console.error('Error fetching coordinates:', err);
      return null;
    }
  }
  
  removeImage(index: number) {
    this.ad.images.splice(index, 1);
  }
}
