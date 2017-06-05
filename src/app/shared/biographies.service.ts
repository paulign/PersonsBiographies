import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Person } from './person'
import { Observable } from "rxjs/Observable";

@Injectable()
export class BiographiesService {
    private url = "/api/persons";
    defaultPhotoSrc = "https://cdn.pixabay.com/photo/2016/02/17/16/32/person-1205346_960_720.png";

    constructor(private http: Http) { }

    public getPersons(): Observable<Person[]> {
        let persons = this.http.get(this.url)
            .map(this.extractPersons)
            .catch(this.handleError);
        return persons;
    }

    public getPerson(_id): Observable<Person> {
        let person = this.http.get(this.url + "/" + _id)
            .map(this.extractPerson)
            .catch(this.handleError);
        return person;
    }

    public addPerson(person: Person) {
        return this.http.post(this.url, person)
            .catch(this.handleError);
    }

    public updatePerson(person: Person) {
        return this.http.put(this.url + "/" + person._id, person)
            .catch(this.handleError);
    }

    public deletePerson(person: Person) {
        return this.http.delete(this.url + "/" + person._id)
            .catch(this.handleError)
    }

    public searchPerson(array, value) {
        var obj = array.filter(function (arr, i) {
            return arr.fullName.toLowerCase().indexOf(value.toLowerCase()) != -1 ? arr.fullName : '';
        });
        return obj;
    }

    private extractPersons(response: Response) {
        let res = response.json();
        let persons: Person[] = [];
        for (let i = 0; i < res.length; i++) {
            if (res[i].photoSrc == null) {
                res[i].photoSrc = "https://cdn.pixabay.com/photo/2016/02/17/16/32/person-1205346_960_720.png";
            }

            persons.push(new Person(res[i]._id, res[i].fullName, res[i].title, res[i].steps, res[i].quote, res[i].photoSrc, res[i].wikiLink));
        }
        return persons;
    }

    private extractPerson(response: Response) {
        let res = response.json();
        if (res.photoSrc == null) {
            res.photoSrc = "https://cdn.pixabay.com/photo/2016/02/17/16/32/person-1205346_960_720.png";
        }
        let person = new Person(res.person._id, res.person.fullName, res.person.title, res.person.steps, res.person.quote, res.person.photoSrc, res.person.wikiLink);
        return person;
    }

    private handleError(error: any, cought: Observable<any>): any {
        let message = "";

        if (error instanceof Response) {
            let errorData = error.json().error || JSON.stringify(error.json());
            message = `${error.status} - ${error.statusText || ''} ${errorData}`
        } else {
            message = error.message ? error.message : error.toString();
        }

        console.error(message);

        return Observable.throw(message);
    }

}
