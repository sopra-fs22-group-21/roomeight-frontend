/**
 * User model
 * most basic version
 */
class Userprofile {
    constructor(data = {}) {
        this.firstName = '';
        this.lastName = '';
        this.description = '';
        this.biography = '';
        this.tags = '';
        this.pictureReference = '';
        // this.matches = '';
        this.birthday = '';
        this.email = '';
        this.phoneNumber = '';
        this.gender = '';
        this.isSearchingRoom = '';
        this.isAdvertisingRoom = '';
        this.moveInDate = '';
        this.moveOutDate = '';
        this.password = '';
        Object.assign(this, data);
    }
}
export default Userprofile;
