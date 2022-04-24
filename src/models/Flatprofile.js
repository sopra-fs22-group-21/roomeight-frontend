/**
 * Flat model
 * most basic version
 */
class FLatprofile {
    constructor(data = {}) {
        this.profilefield = '';
        this.name = '';
        this.description = '';
        this.biography = '';
        this.tags = '';
        this.pictureReference = '';
        this.creationDate = '';
        this.onlineStatus = '';
        this.moveInDate = '';
        this.moveOutDate = '';
        this.address = '';
        this.rent = '';
        this.permanent = '';
        this.numberOfRoommates = '';
        this.roomSize = '';
        this.numberOfBaths = '';
        this.roomMates = '';
        this.matches = '';
        Object.assign(this, data);
    }
}
export default Flatprofile;
