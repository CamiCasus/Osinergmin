import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  message: any;

  constructor(public alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.getMessage().subscribe(message => { this.message = message; });
  }

  public closeAlert() {
    this.message = null;
  }
}
