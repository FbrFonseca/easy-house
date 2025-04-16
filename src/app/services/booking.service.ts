import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, Timestamp, serverTimestamp } from '@angular/fire/firestore';
import { Booking } from '../models/booking.model';
import { Observable, timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private firestore = inject(Firestore);
  private bookingCollection = collection(this.firestore, 'Bookings');

  //new booking
  async createBooking(userId: string, adId: string, message: string): Promise<void> {
    const booking: Booking = {
      userId,
      adId,
      message,
      createAt: serverTimestamp(),
    };

    await addDoc(this.bookingCollection,booking);
  }

  //geting user bookings
  getUserBookings(userId: string): Observable<Booking[]> {
    return collectionData(this.bookingCollection, {
      idField: "id",
    }) as Observable<Booking[]>;
  }
}
