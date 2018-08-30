import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';

@Component({
  selector: 'app-testapi',
  templateUrl: './testapi.component.html',
  styleUrls: ['./testapi.component.scss']
})
export class TestapiComponent implements OnInit {

  genras$: object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getTestApiResult().subscribe(data => this.genras$ = data)
    console.log('getting results')
  }

}