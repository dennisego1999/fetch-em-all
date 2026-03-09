export default class SearchError extends Error {
  constructor() {
    super("Search query cannot be empty");

    this.name = "SearchError";
  }
}
