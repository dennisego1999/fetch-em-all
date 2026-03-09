export default class SearchError extends Error {
  constructor() {
    super("Valid search query is required");

    this.name = "SearchError";
  }
}
