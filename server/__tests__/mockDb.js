exports.saveUser = data => data;
exports.saveGuest = data => data;
exports.saveEvent = data => data;
exports.getEvent = ({id}) => {id: id, name: 'event', startBlock: 1, endBlock: 2, notes: 'a test event', username: 'admin', fieldName: 'crocker3', sportName: 'soccer', date: '7/24/2018', minPlayer: 0, maxPlayer: null}
exports.getMessages = ({id}) => {}
exports.getGuests = ({id}) => {}
exports.getUserEvents = ({username}) => {}
exports.getField = ({id}) => {}
exports.getSports = ({id}) => {}
exports.getFieldEvents = ({id}) => {}
exports.saveField = data => data;
exports.getVenue = ({id}) => {}
exports.getFields = ({id}) => {}
exports.getTodaysFieldEvents = ({id}) => {}
exports.saveVenue = data => data;
exports.getVenuesNearUser = ({username}) => {}
exports.getMe = ({username}) => {}