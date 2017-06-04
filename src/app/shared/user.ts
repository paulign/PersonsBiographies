export class User {
    public id: string;
    public username: string;
    public password: string;

    constructor(username, id) {
        this.username = username;
        this.id = id;

    }
}