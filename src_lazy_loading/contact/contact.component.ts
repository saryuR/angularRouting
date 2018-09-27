//our root app component
import {Component} from '@angular/core'

export class ContactComponent {
  title = 'This is the contact component!';
}
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  template: `
    <h2>Hello there!</h2>
	  <p> {{ title }} </p>
`,
  styles: [`
	 p {
		color: blue;
	}`]
})
export class ContactComponent implements OnInit {
  title = 'This is the contact component!';
}
