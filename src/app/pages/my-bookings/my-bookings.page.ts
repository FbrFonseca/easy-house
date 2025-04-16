import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonList,
  IonItem,
  IonBackButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { BookingService } from 'src/app/services/booking.service';
import { AuthService } from 'src/app/services/auth.service';
import { Booking } from 'src/app/models/booking.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.page.html',
  styleUrls: ['./my-bookings.page.scss'],
  standalone: true,
  imports: [
    IonBackButton,
    IonButtons,
    IonLabel,
    IonList,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class MyBookingsPage implements OnInit {
  private authService = inject(AuthService);
  private bookingService = inject(BookingService);

  bookings$: Observable<Booking[]> | null = null;

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.bookings$ = this.bookingService.getUserBookings(user.uid);
    }
  }
}
