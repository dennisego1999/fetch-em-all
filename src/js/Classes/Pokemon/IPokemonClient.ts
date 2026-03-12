import type IPokemon from "@/js/Classes/Pokemon/IPokemon";
import type IPokemonList from "@/js/Classes/Pokemon/IPokemonList";

export default interface IPokemonClient {
  getPokemonById(id: number): Promise<IPokemon>;
  getPokemonByName(name: string): Promise<IPokemon>;
  getPokemonList(offset: number, limit: number): Promise<IPokemonList>;
}
