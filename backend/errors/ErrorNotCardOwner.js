class ErrorNotCardOwner extends Error {
  constructor(message) {
    super(message);
    this.name = 'ErrorNotCardOwner';
    this.statusCode = 403;
  }
}

module.exports = ErrorNotCardOwner;
