import type IHttpClient from "@/Contracts/IHttpClient";
import type IPokemon from "@/Pokemon/IPokemon";
import PokemonDTO from "@/Pokemon/PokemonDTO";
import type IPokemonRepository from "./IPokemonRepository";

export default class PokemonRepository implements IPokemonRepository {
  constructor(private client: IHttpClient) {
    //
  }

  async findById(id: number): Promise<PokemonDTO> {
    const response = await this.client.get<IPokemon>(`pokemon/${id}`);

    return PokemonDTO.fromResponse(response);
  }

  async findByName(name: string): Promise<PokemonDTO> {
    const response = await this.client.get<IPokemon>(`pokemon/${name}`);

    return PokemonDTO.fromResponse(response);
  }
}
