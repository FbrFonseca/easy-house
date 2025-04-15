import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {
  email = "";
  password = "";
  name = "";
  surname = "";
  phone = "";
  address = "";
  occupation = "";

  constructor(private navCtrl: NavController, private authService: AuthService, private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  registerUser() {
    this.authService.registerUser(this.email, this.password, this.name, this.surname, this.phone, this.address, this.occupation).then(() => {
      this.navCtrl.navigateRoot("/");
    }).catch(async error => {
      const toast = await this.toastCtrl.create({
        message: error.message,
        duration: 3000,
        color: "danger",
      });
      toast.present();
    });
  }

  navigateToLogin() {
    this.navCtrl.navigateBack("/login")
  }

}
