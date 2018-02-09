import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../services/alert.service';

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
    public route: ActivatedRoute,
    public _alertService: AlertService,
    public _authenticationService: AuthenticationService,
    public _router: Router) { }

  ngOnInit() {
    this.setForm();

    this._authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/listado';
  }

  setForm() {
    this.forma = new FormGroup({
      'usuario': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  login() {
    this.loading = true;
    this._authenticationService.login(this.forma.value)
      .subscribe(response => {
        if (response) {
          localStorage.setItem('auth_token', response.auth_token);
          this._router.navigate([this.returnUrl]);
        } else {
          this._alertService.error('Usuario o Credenciales inválidas');
          this.loading = false;

        }
      }, 
      error => {
        this._alertService.error('El servicio de autenticación no está disponible');
        this.loading = false;
      });
  }
}
