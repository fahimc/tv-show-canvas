import { Scene } from "../../manager/scene";
import { fabric } from "fabric";

export class OutsideScene implements Scene {
  public name: string = "outside";
  private sky: fabric.Object | undefined;
  public generate(canvas: fabric.Canvas, callback: () => void) {
    if (this.sky) return;
    const sky = new fabric.Rect({
      width: window.innerWidth * 3,
      height: window.innerHeight * 3,
      fill: "#8AD9E7",
      opacity: 1,
    });
    sky.left = -window.innerWidth * 1;
    sky.top = -window.innerHeight;
    canvas?.add(sky);
    this.sky = sky;
    canvas?.sendToBack(sky);

    for (let a = 0; a < 10; a++) {
      const left = -window.innerWidth * 0.2;
      const mountain = new fabric.Triangle({
        width: window.innerWidth * 0.4,
        height: window.innerHeight * 0.7,
        fill: "#215B31",
        left: left + Number(window.innerWidth * 0.2) * a,

        top: window.innerHeight * 0.3,
      });

      canvas?.add(mountain);
    }

    const height = window.innerHeight * 0.5;
    const road = new fabric.Rect({
      width: window.innerWidth * 3,
      height,
      fill: "#49434D",
      opacity: 1,
    });
    road.left = -window.innerWidth * 1;
    road.top = window.innerHeight * 0.9;
    canvas?.add(road);

    const curb = new fabric.Rect({
      width: window.innerWidth * 3,
      height: window.innerHeight * 0.05,
      fill: "#877B81",
      opacity: 1,
    });
    curb.left = -window.innerWidth * 1;
    curb.top = window.innerHeight * 0.9;
    canvas?.add(curb);
    callback();
  }
  public getBackgroundPath() {
    return "living-room.png";
  }
}
