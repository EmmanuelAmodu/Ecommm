import { Component } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent {
  public carouselOne: NgxCarousel = {
    grid: {xs: 1, sm: 1, md: 2, lg: 3, all: 0},
    slide: 1,
    speed: 400,
    interval: 4000,
    point: {
      visible: true
    },
    load: 2,
    touch: true,
    loop: true,
    custom: 'banner'
  };

  loader(event) {

  }
}
