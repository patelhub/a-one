import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {

  items: any = [];
  schema: any;
  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.http.get('https://node-one.herokuapp.com/candidate').subscribe(data => {
      console.log(data['dataList']);
      this.items = data['dataList'];
    });
  }
  edit(id) {

  }
  delete(id) {
    this.http.delete('https://node-one.herokuapp.com/candidate/' + id).subscribe(data => {
      console.log(data);
      this.getList();
    });
  }

}


