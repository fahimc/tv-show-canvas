import { Character } from "./character";

export class CharacterManager {
  private canvas: fabric.Canvas;
  private characters: Character[] = [];
  constructor(canvas: fabric.Canvas) {
    this.canvas = canvas;
  }
  addCharacter(character: Character) {
    this.characters.push(character);
  }
  getCharacter(name: string) {
    return this.characters.find((item) => item.name === name);
  }
}
