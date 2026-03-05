import InvalidPokemonError from "@/js/Classes/Pokemon/InvalidPokemonError";
import type IPokemon from "@/js/Classes/Pokemon/IPokemon";

export default class PokemonDTO {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly height: number,
    public readonly weight: number,
    public readonly frontSprite: string | null,
  ) {
    //
  }

  static fromResponse(data: IPokemon): PokemonDTO {
    if (!PokemonDTO.isValid(data)) {
      throw new InvalidPokemonError();
    }

    return new PokemonDTO(data.id, data.name, data.height, data.weight, data.sprites.front_default);
  }

  private static isValid(data: unknown): data is IPokemon {
    return (
      typeof data === "object" &&
      data !== null &&
      typeof (data as IPokemon).id === "number" &&
      typeof (data as IPokemon).name === "string" &&
      typeof (data as IPokemon).height === "number" &&
      typeof (data as IPokemon).weight === "number" &&
      typeof (data as IPokemon).sprites === "object" &&
      (data as IPokemon).sprites !== null &&
      ((data as IPokemon).sprites.front_default === null ||
        typeof (data as IPokemon).sprites.front_default === "string")
    );
  }
}
