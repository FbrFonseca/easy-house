import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdService } from 'src/app/services/ad.service';
import { NavController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonInput,
  IonItem,
  IonTextarea,
  IonButton,
  IonImg
} from '@ionic/angular/standalone';

@Component({
  standalone: true,
  selector: 'app-create-ad',
  templateUrl: './create-ad.page.html',
  styleUrls: ['./create-ad.page.scss'],
  imports: [
    IonButton,
    CommonModule,
    FormsModule,
    IonLabel,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonInput,
    IonItem,
    IonTextarea,
    IonImg
  ],
})
export class CreateAdPage {
  ad: any = {
    title: '',
    description: '',
    price: null,
    images: [],
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
    if (
      this.ad.title &&
      this.ad.description &&
      this.ad.price &&
      this.ad.images.length
    ) {
      await this.adService.createAd(this.ad);
      this.navCtrl.back();
    } else {
      alert('Please fill in all fields and upload at least one but no more than five image, no high-res image.');
    }
  }

  removeImage(index: number) {
    this.ad.images.splice(index, 1);
  }
  
}
