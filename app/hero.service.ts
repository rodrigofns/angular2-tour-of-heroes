import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Hero }       from './hero';

@Injectable()
export class HeroService {
    private heroesUrl = 'app/heroes'; // URL to web api

    constructor(private http: Http) { }

    getHeroes() {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    getHero(id: number) {
        return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.id === id));
    }
}
