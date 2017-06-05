export class Person {
    public _id?: string;
    public fullName: string;
    public title: string;
    public steps: Array<{}>;
    public quote: string;
    public photoSrc: string;
    public wikiLink: string;

    constructor(_id, fullName, title, steps, quote, photoSrc="http://images.clipartpanda.com/person-clipart-symbol-person-clipart.png", wikiLink) {
    this._id = _id;
    this.title = title;
    this.fullName = fullName;
    this.steps = steps;
    this.quote = quote;
    this.photoSrc = photoSrc;
    this.wikiLink = wikiLink;
    }
}