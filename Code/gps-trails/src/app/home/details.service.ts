import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class DetailServiceClass {

    @Output() detailComponentEmitter = new EventEmitter<string>();

    selectedString: any;


    selectedSubTrail: any;

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