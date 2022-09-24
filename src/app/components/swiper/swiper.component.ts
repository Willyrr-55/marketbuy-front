import { Component, OnInit } from '@angular/core';

import SwiperCore, { SwiperOptions, Pagination, Autoplay,Navigation } from 'swiper';

SwiperCore.use([Pagination,Autoplay,Navigation]);

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss']
})
export class SwiperComponent implements OnInit {

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    autoplay:true,
    scrollbar:false,
    pagination:true,
    breakpoints:{
      0:{
        navigation:false
      },
      500:{
        navigation:true
      }
    }
  };

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
