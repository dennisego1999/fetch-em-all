import type IPokemonClient from "@/js/Classes/Pokemon/IPokemonClient";
import PokemonDTO from "@/js/Classes/Pokemon/PokemonDTO";
import type IPokemonRepository from "./IPokemonRepository";
import HttpError from "@/js/Classes/Errors/HttpError";
import PokemonNotFoundError from "@/js/Classes/Pokemon/PokemonNotFoundError";

export default class PokemonRepository implements IPokemonRepository {
  constructor(private client: IPokemonClient) {
    //
  }

  async findById(id: number): Promise<PokemonDTO> {
    try {
      const response = await this.client.getPokemonById(id);
      return PokemonDTO.fromResponse(response);
    } catch (e) {
      if (e instanceof HttpError && e.status === 404) {
        throw new PokemonNotFoundError(String(id));
      }

      throw e;
    }
  }

  async findByName(name: string): Promise<PokemonDTO> {
    try {
      const response = await this.client.getPokemonByName(name);
      return PokemonDTO.fromResponse(response);
    } catch (e) {
      if (e instanceof HttpError && e.status === 404) {
        throw new PokemonNotFoundError(name);
      }

      throw e;
    }
  }
}
