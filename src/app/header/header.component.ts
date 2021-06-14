import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Output() featureChange = new EventEmitter<string>();
    selectFeature(feature: string) {
        debugger
        this.featureChange.emit(feature);
    }
}