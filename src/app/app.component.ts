import { Component, VERSION } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Shopname;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    //console.log('hello');
  }
}
