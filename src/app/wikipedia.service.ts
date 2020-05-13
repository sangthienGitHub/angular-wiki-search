import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

interface Car {
  year: number;
  color: string;
  running: boolean;
  make: {
    name: string;
    dateCreated: number;
  };
}

const observable = new Observable<Car>((observable) => {
  observable.next({
    year: 2000,
    color: 'red',
    running: true,
    make: {
      name: 'Chevy',
      dateCreated: 1950,
    },
  });
}).pipe(pluck('make', 'dateCreated'));

observable.subscribe((value) => {
  console.log(value);
});

@Injectable({
  providedIn: 'root',
})
export class WikipediaService {
  constructor(private http: HttpClient) {}

  public search(term: string) {
    return this.http.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        list: 'search',
        utf8: '1',
        srsearch: term,
        origin: '*',
      },
    });
  }
}

/*
https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=space


*/
