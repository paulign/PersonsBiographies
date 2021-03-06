import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Person } from './person'
import { Observable } from "rxjs/Observable";

@Injectable()
export class BiographiesService {
    private url: string = "/api/persons";
    defaultPhotoSrc: string = "./assets/images/person2.png";

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
            let photoSrc = res[i].photoSrc || "./assets/images/person2.png";

            persons.push(new Person(res[i]._id, res[i].fullName, res[i].title, res[i].steps, res[i].quote, photoSrc, res[i].wikiLink));
        }
        return persons;
    }

    private extractPerson(response: Response) {
        let res = response.json();

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
