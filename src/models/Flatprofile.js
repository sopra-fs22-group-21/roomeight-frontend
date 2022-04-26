/**
 * Flat model
 * most basic version
 */
class Flatprofile {
    constructor(data = {}) {
        this.profileId = '';
        this.name = '';
        this.description = '';
        this.biography = '';
        this.tags = [];
        this.pictureReference = '';
        this.creationDate = null;
        this.onlineStatus = '';
        this.moveInDate = null;
        this.moveOutDate = null;
        this.address = '';
        this.rent = NaN;
        this.permanent = null;
        this.numberOfRoommates = NaN;
        this.roomSize = NaN;
        this.numberOfBaths = NaN;
        this.roomMates = [];
        this.matches = [];
        Object.assign(this, data);
    }
}
export default Flatprofile;
