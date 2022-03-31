/**
 * User model
 */
class User {
    constructor(data = {}) {
        this.firstName = null;
        this.lastName = null;
        this.email = null;
        this.phoneNumber = null;
        this.birthday = null;
        this.password = null;
        this.token = null;
        this.gender = null;
        Object.assign(this, data);
    }
}
export default User;
