var Book = require('../models/Book');

var BookCtrl = {};

function _getToken(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
}

BookCtrl.get = function(req, res) {
  var token = _getToken(req.headers);

  if (token) {
    Book.find(function (err, books) {
      if (err) return next(err);
      res.json(books);
    });
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
};

BookCtrl.create = function(req, res) {
  var token = _getToken(req.headers);

  if (token) {
    var newBook = new Book({
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher
    });

    newBook.save(function(err) {
      if (err) {
        return res.json({ success: false, msg: 'Save book failed.' });
      }
      res.json({ success: true, msg: 'Successful created new book.' });
    });
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
};

module.exports = BookCtrl;