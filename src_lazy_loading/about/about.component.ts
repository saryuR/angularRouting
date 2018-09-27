import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <h2>Hello again!!!</h2> 
    <p>{{ title }}</p>
  `
})
export class AboutComponent implements OnInit {
title = 'This is the about page!'

}
