import { Component } from '@angular/core';
import { IonMenuButton, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonButton, IonPopover, IonInput, IonButtons, IonLabel } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { AdCardComponent } from "../widgets/ad-card/ad-card.component";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [FormsModule, IonLabel, IonMenuButton, IonButtons, IonMenu, IonInput, IonPopover, IonButton, IonList, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, AdCardComponent]
})
export class Tab2Page {


  filters = {
    minPrice: null,
    maxPrice: null,
    bedrooms: null,
    location: '',
  };


  constructor() {
  }

  
}
