import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { User } from 'firebase/auth';
import {IonButton, IonAvatar, IonHeader, IonIcon, IonToolbar, IonTitle, IonContent, IonMenu, IonList, IonLabel, IonItem } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { pencilOutline, callOutline, locationOutline, briefcaseOutline, exitOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonButton, IonAvatar, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonList, IonItem, IonLabel],
})

export class Tab3Page implements OnInit {

  user: User | null = null;

  constructor(private authService: AuthService, private navCtrl: NavController) {
    addIcons({pencilOutline, callOutline, locationOutline, briefcaseOutline, exitOutline})
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (!user) {
        this.navCtrl.navigateRoot("/");
      } else {
        this.user = user;
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
}
