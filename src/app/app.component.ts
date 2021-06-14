import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentFeature: string = 'recipe';
  title = 'recipe-kart';

  onFeatureChange(feature: string) {
    this.currentFeature = feature;
  }
}
