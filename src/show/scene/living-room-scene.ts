import { Scene } from "../../manager/scene";

export class LivingRoomScene implements Scene {
  public name: string = "living-room";
  public getBackgroundPath() {
    return "living-room.png";
  }
}
