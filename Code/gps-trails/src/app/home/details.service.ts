import { EventEmitter, Injectable, NgModule, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@NgModule()
@Injectable()
export class DetailServiceClass {

    @Output() detailComponentEmitter = new EventEmitter<string>();

    selectedString: any;


    selectedSubTrail: {
        name: string, reviewsTrial: number, noOfReview: number, length: number, latitude: number, longitude: number,
        time: number, image: string, images: any, path: any, difficulty: string, description: string, routetype: string, elevationgain: number,
        reviews: any
    } = {
            name: "", reviewsTrial: 234, noOfReview: 23, length: 34, latitude: 45, longitude: 567,
            time: 35, image: "", images: [], path: [], difficulty: "", description: "", routetype: "34", elevationgain: 34,
            reviews: 3
        };

    constructor(private httpClient: HttpClient) {

    }
    emitItemSelected(stringselected: string) {
        this.detailComponentEmitter.emit(stringselected);
    }

    parklist: {
        id: number, name: string, image: string, description: string,
        ratingsAvg: number, views: number, lat: number, lon: number
    }[] = [];

    createMessage(message: any): Observable<Object> {


        console.log(message.emailId);
        return this.httpClient.post('http://localhost:3000/users/postNewUser', {
            id: 23,
            username: message.emailId,
            password: message.password,
            firstName: message.fullName,
            lastName: message.fullName,
            addedReviews: "#242",
            addedTrails: "32432"
        });

    }


}