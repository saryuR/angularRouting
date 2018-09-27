import { Component, OnInit } from '@angular/core';
import { AlertService, AuthenticationService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService) { }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    //   this.loading = true;
    localStorage.setItem('currentUser','saryu');
    this.router.navigate([this.returnUrl]);
    //   this.authenticationService.login(this.model.username, this.model.password)
    //       .then(
    //           data => {
    //               this.router.navigate([this.returnUrl]);
    //           },
    //           error => {
    //               this.alertService.error(error);
    //               this.loading = false;
    //           });
  }

}
