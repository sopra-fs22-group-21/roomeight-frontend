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
        this.pictureReferences = [];
        this.creationDate = null;
        this.onlineStatus = '';
        this.moveInDate = null;
        this.moveOutDate = null;
        this.address = '';
        this.rent = 500;
        this.permanent = null;
        this.numberOfRoommates = null;
        this.roomSize = null;
        this.numberOfBaths = null;
        this.roomMates = [];
        this.matches = [];
        this.likes = [];
        Object.assign(this, data);
    }
}
export default Flatprofile;
