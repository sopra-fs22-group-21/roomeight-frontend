/**
 * User model
 * most basic version
 */
class Userprofile {
    constructor(data = {}) {
        this.profileId = '';
        this.firstName = '';
        this.lastName = '';
        this.description = '';
        this.biography = '';
        this.tags = [];
        this.pictureReference = '';
        this.matches = [];
        this.creationDate = null;
        this.onlineStatus = '';
        this.birthday = null;
        this.email = '';
        this.phoneNumber = '';
        this.gender = '';
        this.isSearchingRoom = false;
        this.isAdvertisingRoom = false;
        this.moveInDate = null;
        this.moveOutDate = null;
        this.flatId = '';
        Object.assign(this, data);
    }
}
export default Userprofile;
