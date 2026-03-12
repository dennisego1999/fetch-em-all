import type PokemonDTO from "@/js/Classes/Pokemon/PokemonDTO";
import type IPokemonRepository from "./IPokemonRepository";

export default class PokemonService {
  private static _instance: PokemonService;

  private constructor(private repo: IPokemonRepository) {
    //
  }

  public static get instance(): PokemonService {
    if (!this._instance) {
      throw new Error("PokemonService has not been initialized. Call init() first.");
    }

    return this._instance;
  }

  public static init(repo: IPokemonRepository): PokemonService {
    if (!this._instance) {
      this._instance = new PokemonService(repo);
    }

    return this._instance;
  }

  /**
   * Fetches a random Pokémon by generating a random ID between 1 and 1025.
   * @returns A promise resolving to a randomly selected PokemonDTO.
   */
  public async findRandom(): Promise<PokemonDTO> {
    const id = Math.floor(Math.random() * 1025) + 1;

    return this.repo.findById(id);
  }

  /**
   * Searches for a Pokémon by name.
   * @param search - The name of the Pokémon to look up.
   * @returns A promise resolving to the matching PokemonDTO.
   */
  public async search(search: string): Promise<PokemonDTO> {
    return this.repo.findByName(search);
  }

  /**
   * Compares the weight of two Pokémon and returns a human-readable result.
   * @param a - The first Pokémon to compare.
   * @param b - The second Pokémon to compare.
   * @returns A string stating which Pokémon is heavier.
   */
  public compareWeight(a: PokemonDTO, b: PokemonDTO): string {
    return a.weight > b.weight
      ? `${a.name} is heavier than ${b.name}`
      : `${b.name} is heavier than ${a.name}`;
  }

  /**
   * Fetches a paginated list of Pokémon with full details.
   * Note: fires one request per Pokémon in parallel on top of the list request.
   * @param offset - Number of Pokémon to skip. Defaults to 0.
   * @param limit - Number of Pokémon to fetch per page. Defaults to 12.
   * @returns A promise resolving to an array of PokemonDTOs.
   */
  public async findAll(offset = 0, limit = 12): Promise<PokemonDTO[]> {
    return this.repo.findAll(offset, limit);
  }
}
