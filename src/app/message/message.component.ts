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
    this._message$ = Observable.timer(0, 15000)
      .map( love_statements => {
        const rnd_idx = Math.floor(Math.random() * this._drd._love_sentences.length);

        return this._drd._love_sentences[rnd_idx];
      });
  }

}
