import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public errorMsg;
  
  constructor(private httpClient: HttpClient) {}

  ips: string[] = [
    '172.31.31.1',
    '172.31.31.2',
    '10.33.3.13',
    '10.33.3.14'
  ];
  
  projects: string[] = [
    'Supermicro',
    'eBay',
    'Hulu',
    'Samsung',
    'Walmart',
    'Comcast',
    'Intel',
    'Millennium'
  ];


  stages: string[] = [
    '1',
    '0',
    '2'
  ];

  myform: FormGroup;
  serial: FormControl;
  project: FormControl;
  testServerAddress: FormControl;
  stage: FormControl;


  ngOnInit() {
    // this.buildForm();
    this.createFormControls();
    this.createForm();
  }

createFormControls() {
  this.serial = new FormControl('', Validators.required);
  this.project = new FormControl('');
  this.testServerAddress = new FormControl('');
  this.stage = new FormControl('');
}

createForm() {
  this.myform = new FormGroup({  
    serial: this.serial,
    project: this.project,
    testServerAddress: this.testServerAddress,
    stage: this.stage
  });
}

 
  doPost() { 
    console.log('POST');
    const form = new FormData();
    const testServerAddress = this.myform.controls.testServerAddress.value;
    const project = this.myform.controls.project.value;
    const serial = this.myform.controls.serial.value;
    const stage = this.myform.controls.stage.value;

    console.log('POST' + testServerAddress + project + serial + stage);

    
    form.append('testServerAddress', testServerAddress);
    form.append('project', project);
    form.append('serial', serial);
    form.append('stage', stage);
   
    console.log(form.getAll('testServerAddress'));
    console.log(form.getAll('stage'));
    console.log(form.getAll('project'));
    console.log(form.getAll('serial'));

    this.httpClient.post('http://127.0.0.1:5000/generate',
      // this.httpClient.post('http://172.31.100.113:5000/generate',
        form, { responseType: 'blob'}).subscribe(
        res => {
          console.log("succcess");
          const fileURL = URL.createObjectURL(res);
          window.open(fileURL);  
          console.log("Success!");
        }, err => {
          if (err.status === 0) {
            // display unknown error
            this.errorMsg = "Unknown error";
            console.log(this.errorMsg);
          } else if (err.status === 500) {
            // display server error
            this.errorMsg = "Internal server error";
            console.log(this.errorMsg);
          }
          this.myform.reset();
        });
  }
}
