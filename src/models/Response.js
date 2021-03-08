class Response {
  constructor(statusCode, data, message = '', links = []) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.links = links;
  }
  toString() {
    let obj = {
      statusCode: this.statusCode,
      data: this.data,
    };
    obj =
      this.message !== '' && this.message
        ? { ...obj, message: this.message }
        : obj;
    obj =
      this.links.length !== 0 && this.links
        ? { ...obj, links: this.links }
        : obj;
    return obj;
  }
}

export default Response;
