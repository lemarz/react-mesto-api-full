class ErrorWrongCredentials extends Error {
  constructor(message) {
    super(message);
    this.name = 'ErrorWrongCredentials';
    this.statusCode = 401;
  }
}

module.exports = ErrorWrongCredentials;
