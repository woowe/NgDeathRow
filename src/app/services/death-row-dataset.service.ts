import { Injectable } from '@angular/core';

import { drd_dataset } from './dataset';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class DeathRowDatasetService {
  _dataset: any[];

  _love_sentences: string[];

  constructor() {
    this._dataset = drd_dataset;

    this._love_sentences = this.get_all_love_sentences();
  }

  select_random_statement(): any {
    const rnd_idx = Math.floor(Math.random() * this._dataset.length);

    return this._dataset[rnd_idx].last_statement;
  }

  get_all_love_sentences(): string[] {
    let ret: string[] = [];

    for (let i = 0; i < this._dataset.length; ++i) {
      const statement = this._dataset[i];

      ret = [...ret, ...this.get_love_sentences(statement.last_statement)];
    }

    return ret;
  }

  get_love_sentences(statement: string): string[] {
    const sentences = statement.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);

    let ret = [];

    if (!sentences || !statement) {
      return ret;
    }

    for (let i = 0; i < sentences.length; ++i) {
      if (sentences[i].toLowerCase().indexOf('love') !== -1) {
        ret.push(sentences[i].trim());
      }
    }

    return ret;
  }
}
