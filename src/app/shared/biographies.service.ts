import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Person } from './person'
import { Observable } from "rxjs/Observable";

@Injectable()
export class BiographiesService {
    private url = "/persons";
    defaultPhotoSrc = "src/app/images/person2.png";

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
                res[i].photoSrc = "src/app/images/person2.png";
            }

            persons.push(new Person(res[i].person._id, res[i].person.fullName, res[i].person.title, res[i].person.steps, res[i].person.quote, res[i].person.photoSrc, res[i].person.wikiLink));
        }
        return persons;
    }

    private extractPerson(response: Response) {
        let res = response.json();
        if (res.photoSrc == null) {
            res.photoSrc = "src/app/images/person2.png";
        }
        let person = new Person(res._id, res.fullName, res.title, res.steps, res.quote, res.photoSrc, res.wikiLink);
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
