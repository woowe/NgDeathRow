import { Injectable } from '@angular/core';

import { drd_dataset } from './dataset';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class DeathRowDatasetService {
  _dataset: any[];

  _love_sentences$: Observable<string[]>;

  constructor() {
    this._dataset = drd_dataset;
  }

  select_random_statement(): any {
    const rnd_idx = Math.floor(Math.random() * this._dataset.length);

    return this._dataset[rnd_idx].last_statement;
  }

  get_love_sentences(statement: string) {
    const sentences = statement.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);

    console.log(statement);

    let ret = [];

    if (!sentences || !statement) {
      return ret;
    }

    for (let i = 0; i < sentences.length; ++i) {
      if (sentences[i].toLowerCase().indexOf('love') !== -1) {
        ret.push(sentences[i]);
      }
    }

    return ret;
  }
}
