exports.saveUser = data => data;
exports.saveGuest = data => data;
exports.saveEvent = data => data;
exports.getEvent = ({ id }) => ({
  id: id,
  name: 'event',
  startBlock: 1,
  endBlock: 2,
  notes: 'a test event',
  username: 'admin',
  fieldName: 'crocker 3',
  sportName: 'soccer',
  date: '7/24/2018',
  minPlayer: 10,
  maxPlayer: 30,
});
exports.getMessages = ({ id }) => [{}];
exports.getGuests = ({ id }) => [{}];
exports.getUserEvents = ({ username }) => [{}];
exports.getField = ({ id }) => {};
exports.getSports = ({ id }) => ['soccer', 'football', 'basketball', 'tennis', 'ultimate frisbee'];
exports.getFieldEvents = ({ id }) => [{}];
exports.saveField = data => data;
exports.getVenue = ({ id }) => {};
exports.getFields = ({ id }) => [{}];
exports.getTodaysFieldEvents = ({ id }) => [{}];
exports.saveVenue = data => data;
exports.getVenuesNearUser = ({ username }) => [{}];
exports.getMe = ({ username }) => ({
  id: 1,
  username: username,
  address: '1313 Disneyland Dr, Anaheim, CA 92802',
  lat: 33.835293,
  lng: -117.914505,
  firstName: 'john',
  lastName: 'smith',
  rating: 10,
  isAdmin: true,
  email: 'google@gmail.com',
});
