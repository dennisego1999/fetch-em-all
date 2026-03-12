import type IRepository from "@/js/Classes/Contracts/IRepository";
import type PokemonDTO from "@/js/Classes/Pokemon/PokemonDTO";

export default interface IPokemonRepository extends IRepository<PokemonDTO> {
  findByName(name: string): Promise<PokemonDTO>;
  findAll(offset: number, limit: number): Promise<PokemonDTO[]>;
}
