import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable()
export class DetailServiceClass {

    @Output() detailComponentEmitter = new EventEmitter<string>();

    selectedString: any;
    emitItemSelected(stringselected: string) {
        this.detailComponentEmitter.emit(stringselected);
    }

    parklist: {
        id: number, parkname: string, imgurl: string, parkDesc: string,
        lat1: number, lng1: number

    }[] = [
            {
                "id": 0,
                parkname: "Yosemite National Park",
                imgurl: "https://www.nationalgeographic.com/content/dam/travel/2019-digital/yosemite-guide/yosemite-national-park-california.jpg",
                parkDesc: "Beautiful destination in the world attracts speople all round the world",
                lat1: 37.8651,
                lng1: -119.5383,


            },
            { "id": 1, parkname: "Acadia", imgurl: "https://www.apple.com/newsroom/images/product/services/lifestyle/ApplePay-and-AppleWatch-celebrate-americas-national-parks-08232018_big.jpg.large.jpg", parkDesc: "Located in the Silicon valley of United States..", lat1: 68.2733, lng1: 44.3386 },
            { "id": 2, parkname: "Arches", imgurl: "https://studybreaks.com/wp-content/uploads/2017/07/shutterstock_142351951.jpg", parkDesc: "Beautiful destination in the world attracts speople all round the world", lat1: 38.7331, lng1: 109.5925 },
            { "id": 3, parkname: "Badlands", imgurl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/BadlandsView3.jpg/400px-BadlandsView3.jpg", parkDesc: "Beautiful destination in the world attracts speople", lat1: 43.8554, lng1: -102.3397 },

        ];

}