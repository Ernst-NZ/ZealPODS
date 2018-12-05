import { Component, OnInit } from '@angular/core';
//import { LogService } from '../_services/log.service';

@Component({
  selector: 'app-log-test',
  templateUrl: './log-test.component.html',
  styleUrls: ['./log-test.component.scss']
})
export class LogTestComponent implements OnInit {

//  constructor(private logger: LogService) { }

  ngOnInit() {
  }
  // testLog(): void {
  //   this.logger.log("Test the log() Method");
  // }
}
