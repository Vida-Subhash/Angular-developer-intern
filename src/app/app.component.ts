import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ourForm: FormGroup; //add
  bank_details: FormGroup;
  fssai_details: FormGroup;
  gst_details: FormGroup;
  submitting = false;
  submitted = false;



  status:  ['Weekly off', 'Open'];
  private submissionForm: AngularFirestoreCollection<any>;  //add

  constructor(private _formBuilder: FormBuilder, private fb: FormBuilder, private firestore: AngularFirestore) {}

  ngOnInit(): void {
    //kitchen Details
    this.submissionForm = this.firestore.collection('kitchen-details');
    this.ourForm = this.fb.group({
            name: [''],
            area: [''],
            email: [''],
            status: [''],
            partner_id: [''],
            address: [''],
            category: [''],
            phone_number: [''],
            alternative_number: ['']
    });

    this.submissionForm = this.firestore.collection('Bank Details');
    this.bank_details = this.fb.group({
      bank_number: [''],
      bank_name: [''],
      bank_ifsc: [''],
      bank_branch: [''],

    });

    this.submissionForm = this.firestore.collection('FSSAI Details');
    this.fssai_details = this.fb.group({
      license_number: [''],
      authorized_address: [''],
      date: [''],
      authorized_name: [''],
      career_name: ['']

    });

    this.submissionForm = this.firestore.collection('Edit Kitchen Details');
    this.gst_details = this.fb.group ({
      gst_number: [''],
      confirm_number: ['']
    });
  }
//  {
//     this.firstFormGroup = this._formBuilder.group({
//       firstCtrl: ['', Validators.required]
//     });
//     this.secondFormGroup = this._formBuilder.group({
//       secondCtrl: ['', Validators.required]
//     });
//   }



submitData(value: any) {
  console.log(this.submitted);

  this.submitting = true;
  this.submissionForm.add(value).then(res => {
    this.submitted = true;
  }).catch(err => console.log(err)
  ).finally(() => {
    this.submitting = false;
  });

}
}
