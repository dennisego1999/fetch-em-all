export default class PokemonMappingError extends Error {
  constructor() {
    super("Invalid Pokemon response");

    this.name = "InvalidPokemonError";
  }
}
