export class User {
    public _id: string;
    public username: string;
    public password: string;

    constructor(username, _id) {
        this.username = username;
        this._id = _id;

    }
}