import { Component, OnInit } from '@angular/core';
import SwiperCore from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSwiper([swiper]) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

}
