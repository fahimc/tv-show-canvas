import { Character } from "../../manager/character";

export class TodCharacter extends Character {
  public name: string = "bob";
  public getImagePath() {
    return "character-1.png";
  }
}
