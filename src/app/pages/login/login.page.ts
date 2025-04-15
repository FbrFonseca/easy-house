import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, ToastController } from '@ionic/angular';
import { User } from 'firebase/auth';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonGrid, IonCol, IonButton, IonRow, IonInput } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonInput, IonContent, IonHeader, IonTitle, IonToolbar,
     CommonModule, FormsModule, ReactiveFormsModule, IonImg, IonGrid, IonCol, IonButton, IonRow]
})

export class LoginPage implements OnInit {
  gEmail = "";
  gPassword = "";

  user: User | null = null;

  constructor(private navCtrl: NavController, private authService: AuthService, private toastCtrl: ToastController) { 
    addIcons({arrowBackOutline});
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (user) {
        console.log("User already logged in: ", user);
        this.navCtrl.navigateRoot("/");
      }
    });
  }

  loginUser(){
    console.log("email:", this.gEmail);
    this.authService.loginUser(this.gEmail, this.gPassword).then(() => {
      console.log("login successful");
      this.navCtrl.navigateBack("/");
    }).catch(async error => {
      const toast = await this.toastCtrl.create({
        message: error.message,
        duration: 3000,
        color: 'danger',
      });
      toast.present();
    })
  }

  navigateBack() {
    this.navCtrl.navigateRoot("/");
  }

  goToRegister() {
    this.navCtrl.navigateForward("/register")
  }
}
