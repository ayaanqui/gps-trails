import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trail-brief',
  templateUrl: './trail-brief.component.html',
  styleUrls: ['./trail-brief.component.css']
})
export class TrailBriefComponent implements OnInit {

  @Input() name: string = "";
  @Input() description: string = "";
  @Input() views: string = "";
  @Input() ratingsAvg: string = "";
  @Input() image: string = "";
  @Input() sm: string = "";
  
  starElement = (icon: string): string => `<i class="fa ${icon}"></i>\n`;

  getStars: Function = () => {
    let stars = "";
    const ratings: number = parseFloat(this.ratingsAvg);
    let leftovers: number = 5-ratings;

    let r = ratings;

    for (let i = 0; i < Math.floor(ratings); i++) {
      stars += this.starElement("fa-star");
      r -= 1;
    }

    // Add half star if r is not 0
    if (r > 0) {
      stars += this.starElement("fa-star-half-o");
      leftovers--;
    }

    // Add left over empty stars
    for (let i = 0; i < leftovers; i++)
      stars += this.starElement("fa-star-o");
    return stars;
  };

  constructor() { }

  ngOnInit(): void {
  }

}
