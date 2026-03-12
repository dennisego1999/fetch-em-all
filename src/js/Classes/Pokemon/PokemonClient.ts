import HttpClient from "@/js/Classes/Clients/HttpClient";
import type IPokemonClient from "@/js/Classes/Pokemon/IPokemonClient";
import type IPokemon from "@/js/Classes/Pokemon/IPokemon";
import type IPokemonList from "@/js/Classes/Pokemon/IPokemonList";

export default class PokemonClient extends HttpClient implements IPokemonClient {
  constructor() {
    super("https://pokeapi.co/api/v2/");
  }

  getPokemonById(id: number): Promise<IPokemon> {
    return this.get<IPokemon>(`pokemon/${id}`);
  }

  getPokemonByName(name: string): Promise<IPokemon> {
    return this.get<IPokemon>(`pokemon/${name}`);
  }

  getPokemonList(offset: number, limit: number): Promise<IPokemonList> {
    return this.get<IPokemonList>(`pokemon?offset=${offset}&limit=${limit}`);
  }
}
