import { SceneManager } from "./scene-manager";

export interface CharacterInterface {
  name: string;
  canvas: fabric.Canvas;
  instance?: fabric.Object;
  left: number;
  getImagePath: () => string;
  walk: (targetX: number, duration: number) => void;
}
export class Character {
  canvas: fabric.Canvas;
  name: string = "";
  sceneManager: SceneManager;
  instance?: fabric.Object;
  left: number = 0;
  constructor(canvas: fabric.Canvas, sceneManager: SceneManager) {
    this.canvas = canvas;
    this.sceneManager = sceneManager;
  }
  getImagePath() {}
  walk(targetX: number, duration: number) {
    let startTime = new Date().getTime();
    let startLeft = this.left;

    this.animateStep(targetX, startTime, duration, startLeft);
  }
  position(x: number) {
    this.left = x;
    if (this.instance) this.instance.left = x;
  }
  animateStep(
    targetX: number,
    startTime: number,
    duration: number,
    startLeft: number
  ) {
    let now = new Date().getTime();
    let progress = Math.min(1, (now - startTime) / duration);

    this.instance?.set("left", startLeft + (targetX - startLeft) * progress);
    this.sceneManager.cameraManager.follow(this.instance);
    this.canvas.renderAll();

    if (progress < 1) {
      requestAnimationFrame(() =>
        this.animateStep(targetX, startTime, duration, startLeft)
      );
    }
  }
}
