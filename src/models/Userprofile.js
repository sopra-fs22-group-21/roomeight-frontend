/**
 * User model
 * most basic version
 */
class Userprofile {
    constructor(data = {}) {
        this.FirstName = null;
        this.LastName = null;
        this.EmailAddress = null;
        this.PhoneNumber = null;
        this.Birthday = null;
        this.Password = null;
        Object.assign(this, data);
    }
}
export default Userprofile;
