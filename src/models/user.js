export default class User {
    constructor(id = 0, fullname = "", email = "", password = "", roles = []) {
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
}
