import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormHelper } from '../../../share/form-util/form-helper';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss']
})
export class CandidateFormComponent implements OnInit {
  candidateForm = null;
  // candidateForm = new FormGroup({
  //   firstname: new FormControl(),
  //   lastname: new FormControl(),
  //   aid: new FormControl()
  // });
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.init();
  }
  init() {
    this.http.get('https://node-one.herokuapp.com/get/candidate').subscribe(data => {
      this.candidateForm = FormHelper.build(data['schema']);
      console.log(data);
    });
  }

  save() {
    if (!this.candidateForm.valid) {
      return;
    }
    this.http.post('https://node-one.herokuapp.com/candidate',
      this.candidateForm.value).subscribe(() => {
        console.log(this.candidateForm.value);
        this.router.navigate(['\candidate']);
      });
  }

  cancel(){
    this.router.navigate(['\candidate']);
  }
}
