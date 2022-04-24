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
        this.tags = [];
        this.pictureReference = '';
        // this.matches = '';
        this.birthday = new Date(NaN);
        this.email = '';
        this.phoneNumber = '';
        this.gender = '';
        this.isSearchingRoom = false;
        this.isAdvertisingRoom = false;
        this.moveInDate = new Date(NaN);
        this.moveOutDate = new Date(NaN);
        this.password = '';
        Object.assign(this, data);
    }
}
export default Userprofile;
