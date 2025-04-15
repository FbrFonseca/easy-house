import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { User } from 'firebase/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonButton, IonAvatar, IonHeader, IonIcon, IonToolbar, IonTitle, IonContent, IonMenu, IonList, IonLabel, IonItem, IonInput } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { pencilOutline, callOutline, locationOutline, briefcaseOutline, exitOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonInput, IonButton, IonAvatar, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonList, IonItem],
})

export class Tab3Page implements OnInit {

  user: User | null = null;
  avatar: string | null = null;

  profileData: any = {};

  isEditing = false;

  constructor(private authService: AuthService, private navCtrl: NavController) {
    addIcons({pencilOutline, callOutline, locationOutline, briefcaseOutline, exitOutline})
  }

  ngOnInit() {
    this.authService.user$.subscribe(async (user) => {
      if (!user) {
        this.navCtrl.navigateRoot("/login");
      } else {
        this.user = user;
        const data = await this.authService.getUserProfileData(user.uid);
        if (data) {
          this.profileData = data;
          this.avatar = data.avatar;
        }
      }
    });
  }

  logoutUser() {
    this.authService.logoutUser().then(() => {
      console.log("User logged out seccessfully");
      this.navCtrl.navigateRoot("/");
    }).catch(error => {
      console.log("logout error: ", error.message);
    });
  }

  async editProfile() {
    const uid = this.authService.getCurrentUser()?.uid;
    if (!uid) return;

    const updateData = {
      phone: this.profileData.phone || '',
      address: this.profileData.address || '',
      occupation: this.profileData.occupation || '',
      avatar: this.avatar || '',
    };

    try {
      await this.authService.updateUserProfile(uid, updateData);
      console.log("profile updated successfully");
      this.isEditing = false;
    } catch (error) {
      console.error("error updating profile: ", error);
    }


  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatar = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

 

  toggleEditMode() {
    if (this.isEditing) {
      this.editProfile();
    }
    this.isEditing = !this.isEditing;
  }

}
