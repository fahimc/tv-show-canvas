import { Character } from "../../manager/character";

export class BobCharacter extends Character {
  public name: string = "tod";
  public getImagePath() {
    return "character-2.png";
  }
}
