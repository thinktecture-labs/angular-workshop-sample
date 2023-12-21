import {Pokemon} from "./pokemon";
import {Stat} from "./stat";

export interface PokemonDetails extends Pokemon {
  generation: string;
  height: number;
  baseExperience: number;
  types: string[];
  stats: Stat[];
}

