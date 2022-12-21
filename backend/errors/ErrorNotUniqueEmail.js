class ErrorNotUniqueEmail extends Error {
  constructor(message) {
    super(message);
    this.name = 'ErrorNotUniqueEmail';
    this.statusCode = 409;
  }
}

module.exports = ErrorNotUniqueEmail;
