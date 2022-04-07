/**
 * User model
 * most basic version
 */
class Userprofile {
    constructor(data = {}) {
        this.FirstName = '';
        this.LastName = '';
        this.Description = '';
        this.Biography = '';
        this.Tags = '';
        this.PictureReference = '';
        this.Matches = '';
        this.CreationDate = '';
        this.OnlineStatus = '';
        this.Birthday = '';
        this.EmailAddress = '';
        this.PhoneNumber = '';
        this.Gender = '';
        this.IsSearchingRoom = '';
        this.IsAdvertisingRoom = '';
        this.MoveInDate = '';
        this.MoveOutDate = '';
        this.Password = '';
        Object.assign(this, data);
    }
}
export default Userprofile;
