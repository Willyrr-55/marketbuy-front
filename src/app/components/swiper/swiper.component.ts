import { Component, OnInit } from '@angular/core';

import SwiperCore, {
  SwiperOptions,
  Pagination,
  Autoplay,
  Navigation,
} from 'swiper';

SwiperCore.use([Pagination, Autoplay, Navigation]);

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
})
export class SwiperComponent implements OnInit {
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    // navigation: true,
    autoplay:true,
    scrollbar: false,
    pagination: { clickable: true },
    breakpoints: {
      0: {
        navigation: false,
      },
      500: {
        navigation: true,
      },
    },
  };

  infoSwiper = [
    { url: '/assets/apple-hero-757.png', background: '#EAB676', title:'Súper descuentos', subTitle:'Aprovecha los súper descuentos que tenemos para ti todas las semanas'},
    { url: '/assets/descarga.png', background: '#ABDBE3', title:'Tecnología a tu alcance', subTitle:'Tenemos lo mejor de la tecnología al alcance de un click' },
    { url: '/assets/descarga2.png', background: '#76B5C5', title:'Especialistas en productos Apple', subTitle:'Contamos con asesoramientos sobre garantías, productos en específico, y más.' },
  ];

  constructor() {}

  ngOnInit(): void {}

  onSwiper([swiper]) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
