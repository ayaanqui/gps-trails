import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable()
export class DetailServiceClass {

    @Output() detailComponentEmitter = new EventEmitter<string>();

    selectedString: any;
    emitItemSelected(stringselected: string) {
        this.detailComponentEmitter.emit(stringselected);
    }

    parklist: {
        id: number, name: string, image: string, description: string, 
        ratingsAvg: number, views: number, lat: number, lon: number
    }[] = [];

}