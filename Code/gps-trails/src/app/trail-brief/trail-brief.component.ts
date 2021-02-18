import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trail-brief',
  templateUrl: './trail-brief.component.html',
  styleUrls: ['./trail-brief.component.css']
})
export class TrailBriefComponent implements OnInit {

  @Input() name: string = "";
  @Input() description: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
