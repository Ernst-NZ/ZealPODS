import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
export interface Reason {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-rejectproducts',
  templateUrl: './rejectproducts.component.html',
  styleUrls: ['./rejectproducts.component.scss']
})
export class RejectproductsComponent implements OnInit {
  reject: Reason[] = [
    {value: 'nopay-0', viewValue: 'Damaged'},
    {value: 'cash-1', viewValue: 'Wrong Product'},
    {value: 'cheque', viewValue: 'Spoiled'}
  ];
  productDetail$: Object;
  public lineID;
  public docID;
  public i: number;

    constructor(private route: ActivatedRoute, private data: DataService) {
    this.route.params.subscribe( params => this.productDetail$ = params.DocumentId );
 }

 ngOnInit() {
  this.data.getAllRoutes().subscribe(
    data => this.productDetail$ = data
  );
  const getLine = (this.route.snapshot.paramMap.get('LineId'));
  this.i = getLine.lastIndexOf(',');
  this.docID = getLine.substring(0, this.i);
  this.lineID = getLine.substring(this.i + 1);
}
}
