import { Component, OnInit } from '@angular/core';

import { DeathRowDatasetService } from '../services/death-row-dataset.service';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  _message$: Observable<any>;

  constructor(public _drd: DeathRowDatasetService) { }

  ngOnInit() {
    this._message$ = Observable.interval(1000)
      .map((v, i) => this._drd.select_random_statement())
      .map(statement => this._drd.get_love_sentences(statement))
      .filter( love_statements => love_statements.length !== 0)
      .map( love_statements => {
        const rnd_idx = Math.floor(Math.random() * love_statements.length);

        return love_statements[rnd_idx];
      });
  }

}
