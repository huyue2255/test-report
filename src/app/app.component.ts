import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

// export interface IP {
//   value: string;
//   viewValue: string;
// }

// export interface Project {
//   viewValue: string;
// }

// export interface Stage {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public errorMsg;
  // serial: FormControl;
  
  // serial = new FormControl('', [Validators.required, Validators.serial]);

  // getErrorMessage() {
  //   return this.serial.hasError('required') ? 'You must enter a value' :
  //       this.serial.hasError('serial') ? 'Not a valid serial' :
  //           '';
  // }
  constructor(private httpClient: HttpClient) {}
  
  // myform = new FormGroup({
  //   serial: new FormControl(),
  //   project: new FormControl(),
  //   ip: new FormControl(),
  //   stage: new FormControl(),
  // });

  // ips: IP[] = [
  //   {value: ' B6-L1', viewValue: '172.31.31.1'},
  //   {value: 'B6-L2', viewValue: '172.31.31.2'},
  //   {value: 'B21-L1', viewValue: '10.33.3.13'},
  //   {value: 'B21-L2', viewValue: '10.33.3.13'}
  // ];

  // projects: Project[] = [
  //   {viewValue: 'Supermicro'},
  //   {viewValue: 'eBay'},
  //   {viewValue: 'Hulu'},
  //   {viewValue: 'Samsung'},
  //   {viewValue: 'Walmart'},
  //   {viewValue: 'Comcast'},
  //   {viewValue: 'Intel'},
  //   {viewValue: 'Millennium'}
  // ];

  // stages: Stage[] = [
  //   {value: 'Burn-in', viewValue: '1'},
  //   {value: 'Pre-test', viewValue: '0'},
  //   {value: 'Fst', viewValue: '2'}
  // ];

  // ips: string[] = [
  //   'B6-L1',
  //   'B6-L2',
  //   'B21-L1',
  //   'B21-L2',
  // ];

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

  // stages: string[] = [
  //   'Burn-in',
  //   'Pre-test',
  //   'FST'
  // ];

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

//   buildForm(): void {
//     this.myform = this.formBuilder.group({
//       serial: ['', Validators.required],
//       project: ['', ],
//       ip: [''],
//       stage: ['']
//     });
// }
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


// buildForm(): void {
//   this.myform = this.formBuilder.group({
//     serial: ['', Validators.required],
//     project: ['', ],
//     ip: [''],
//     stage: ['']
//   });
// }


  // myform = new FormGroup({
  //   serial: new FormControl(),
  //   project: new FormControl(),
  //   ip: new FormControl(),
  //   stage: new FormControl(),
  // });


 
  doPost() { 
    console.log('POST');
    const form = new FormData();
    const testServerAddress = this.myform.controls.testServerAddress.value;
    const project = this.myform.controls.project.value;
    const serial = this.myform.controls.serial.value;
    const stage = this.myform.controls.stage.value;

    console.log('POST' + testServerAddress + project + serial + stage);

    // if(ip == "B6-L1"){
    //   form.append('ip', '172.31.31.1');
    // }else if(ip == "B6-L2"){
    //   form.append('ip', '172.31.31.2');
    // }else if(ip == "B21-L1"){
    //   form.append('ip', '10.33.3.13');
    // }else{
    //   form.append('ip', '10.33.3.14');
    // }
    form.append('testServerAddress', testServerAddress);
    form.append('project', project);
    form.append('serial', serial);
    form.append('stage', stage);
    // if(stage == "Burn-in"){
    //   form.append('stage', '1');
    // }else if(stage == "Pre-test"){
    //   form.append('stage', '0');
    // }else {
    //   form.append('stage', '2');
    // }
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
