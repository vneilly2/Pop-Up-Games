
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let UserSchema = mongoose.Schema({
  username: String
  password: String
  firstName: String,
  lastName: String,
  address: String, // could be removed if lat and long are working
  latitude: Number,
  longitude: Number,
  rating: { type: Number, default: 5},
  isAdmin: { type: Boolean, default: false}  //or number if we want various levels of power
  created_at: { type: Date, default: Date.now}
});

let EventSchema = mongoose.Schema({
  eventName: String
  address: String, //or lat and long
  startBlock: Number,
  endBlock: Number,
  Notes: String,
  min: Number,
  max: Number,
  created_at: { type: Date, default: Date.now }
});

let MessageSchema = mongoose.Schema({
  message: String,
  created_at: { type: Date, default: Date.now }
});


let SportSchema = mongoose.Schema({
  name: String,
  verified: {type: Boolean, default: false}
});

let FieldSchema = mongoose.Schema({
  Notes: String,
  verified: {type: Boolean, default: false}
});

let VenueSchema = mongoose.Schema({
  Name: String,
  address: String, // or lat and long
  verified: {type: Boolean, default: false}
});


let User = mongoose.model('user', UserSchema);
let Event = mongoose.model('event', EventSchema);
let Message = mongoose.model('message', MessageSchema);
let Sport = mongoose.model('sport', SportSchema);
let Field = mongoose.model('field', FieldSchema);
let Venue = mongoose.model('venue', VenueSchema);

let save = (name, password, res) => {
  var newRepo = new Kill({repoName: term, user: "alive"});
  Kill.findOneAndUpdate(
    {repoName: term},
    newRepo,
    {upsert: true, new: true, runValidators: true},
  );
  res.sendStatus(201);
}

let retrieve = (res) => {
  Kill.count().exec((err, count) =>
    Kill.find().sort({"created_at": -1}).limit(25)
      .exec((err, doc) => res.status(200).send({docs: doc, count: count}))
  )
}

let update = (term, res) => {
  // Kill.findById(id, function (err, tank) {
  //  tank.set({ size: 'large' });
  // tank.save(function (err, updatedTank) {
  //   if (err) return handleError(err);
  //   res.send(updatedTank);
  // });
  // });
  Kill.find({repoName: term}).exec((err, doc) =>
    {
      console.log(doc[0].htmlUrl);
      var a = doc[0].htmlUrl;
      doc[0].set({htmlUrl: a + 1});
      doc[0].save(() =>{});
      // var newRepo = new Kill({repoName: term, user: "alive", htmlUrl: doc[0].htmlUrl + 1});
      // Kill.findOneAndUpdate(
      //   {repoName: term},
      //   newRepo,
      //   {upsert: true, new: true, runValidators: true},
      //   function (err, doc) {
      //     console.log
      //   }
      // );
    }
  );
  res.sendStatus(201);
}

module.exports.update = update;
module.exports.save = save;
module.exports.retrieve = retrieve;
