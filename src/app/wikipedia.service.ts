import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

interface WikipediaResponse {
  query: {
    search: {
      title: string;
      snippet: string;
      pageid: number;
    }[];
  };
}

// START - just an example and is not related to the project
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

// END - just an example and is not related to the project

@Injectable({
  providedIn: 'root',
})
export class WikipediaService {
  constructor(private http: HttpClient) {}

  public search(term: string) {
    //this.http.get is already an observable, added generic type of wikipedia interface so typescript know what
    // kind of data it will get from wikipedia call
    return this.http
      .get<WikipediaResponse>('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          format: 'json',
          list: 'search',
          utf8: '1',
          srsearch: term,
          origin: '*',
        },
      })
      .pipe(pluck('query', 'search'));
  }
}

/*
https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=space


*/
