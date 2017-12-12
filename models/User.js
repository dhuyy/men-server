var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['ADMIN', 'CREATOR', 'VIEWER'],
    default: 'VIEWER'
  }
}, {
  timestamps: true
});

UserSchema.pre('save', function (next) {
  var user = this;
  var SALT_FACTOR = 10;

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return cb(err);

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);