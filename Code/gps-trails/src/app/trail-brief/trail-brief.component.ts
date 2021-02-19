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
  
  getStars: Function = () => {
    let stars = "";
    const ratings: number = parseFloat(this.ratingsAvg);
    const leftovers: number = 5-ratings;

    for (let i = 0; i < ratings; i++)
      stars += '<i class="fa fa-star"></i>\n';

    for (let i = 0; i < leftovers-1; i++)
      stars += '<i class="fa fa-star-o"></i>\n';
    return stars;
  };

  constructor() { }

  ngOnInit(): void {
  }

}
