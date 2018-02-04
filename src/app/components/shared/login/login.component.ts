import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  forma: FormGroup;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private _authenticationService: AuthenticationService,
    private _router: Router) { }

  ngOnInit() {
    this.setForm();

    this._authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/listado';
  }

  setForm() {
    this.forma = new FormGroup({
      'usuario': new FormControl(),
      'password': new FormControl()
    });
  }

  login() {
    this.loading = true;
    this._authenticationService.login(this.forma.value)
      .subscribe(
      data => {
        console.log(this.returnUrl);
        this._router.navigate([this.returnUrl]);
      },
      error => {
        // this.alertService.error(error);
        this.loading = false;
      });
  }
}
