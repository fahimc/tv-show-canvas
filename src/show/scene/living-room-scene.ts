import { Scene } from "../../manager/scene";
import { fabric } from "fabric";
export class LivingRoomScene implements Scene {
  public name: string = "living-room";
  private instance: fabric.Object | undefined;
  private canvas: fabric.Canvas | undefined;
  public generate(canvas: fabric.Canvas, callback: () => void) {
    this.canvas = canvas;
    const imageObj = new Image();

    imageObj.onload = () => {
      if (this.instance) return;
      const imgInstance = new fabric.Image(imageObj, {
        left: -300,
        top: -300,
        angle: 0,
        opacity: 1,
      });
      imgInstance.width = window.innerWidth;
      imgInstance.height = window.innerHeight;
      imgInstance.scale(1.5);
      this.instance = imgInstance;

      this.canvas?.add(imgInstance);
      this.canvas?.sendToBack(imgInstance);
      callback();
    };
    imageObj.src = "scene/" + this.getBackgroundPath();
  }
  public getBackgroundPath() {
    return "living-room.png";
  }
}
