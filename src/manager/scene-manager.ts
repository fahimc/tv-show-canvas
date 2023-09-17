import { BobCharacter } from "../show/character/bob-character";
import { TodCharacter } from "../show/character/tod-character";
import { Camera } from "./camera";
import { CameraManager } from "./camera-manager";
import { Character } from "./character";
import { CharacterManager } from "./character-manager";
import { NarratorManager } from "./narrator-manager";
import { Scene } from "./scene";
import { fabric } from "fabric";

export class SceneManager {
  private canvas: fabric.Canvas;
  private characterManager: CharacterManager;
  public cameraManager: CameraManager;
  private scenes: Scene[] = [];
  private setText: (text: string) => void;
  private narratorManager: NarratorManager;
  constructor(
    canvas: fabric.Canvas,
    canvasElement: HTMLCanvasElement,
    setText: (text: string) => void
  ) {
    this.canvas = canvas;
    (canvasElement as HTMLCanvasElement).width = window.innerWidth;
    (canvasElement as HTMLCanvasElement).height = window.innerHeight;
    this.characterManager = new CharacterManager(canvas);
    this.narratorManager = new NarratorManager();
    this.cameraManager = new CameraManager(canvas);
    this.setText = setText;
  }
  addScene(scene: Scene) {
    this.scenes.push(scene);
  }
  setScene(name: string) {
    const scene = this.scenes.find((item) => item.name === name);
    console.log(scene);
    if (!scene) return;
    this.cameraManager.addCamera(new Camera(1, 0, 0));
    this.cameraManager.addCamera(new Camera(1, 0, 0));
    this.addBackground(scene?.getBackgroundPath(), () => {
      this.characterManager.addCharacter(new BobCharacter(this.canvas, this));
      this.characterManager.addCharacter(new TodCharacter(this.canvas, this));
      const character1 = this.characterManager.getCharacter("bob");
      const character2 = this.characterManager.getCharacter("tod");
      console.log(character1?.getImagePath());
      if (character1) this.addCharacter(character1);
      if (character2) this.addCharacter(character2, 200);
      this.cameraManager.switchCamera(0);
      //   document.addEventListener("click", () => {
      //     this.narratorManager.speak(
      //       " A quiet park, late afternoon. Birds can be heard chirping, and there’s a soft glow as the sun begins to set.",
      //       () => {}
      //     );
      //   });
      setTimeout(() => {
        if (!character1 || !character2) return;
        character1.position(0.1 * window.innerWidth); // Bob starts on the far left.
        character2.position(0.8 * window.innerWidth); // Tod is seated further right on the bench.

        // this.cameraManager.zoomIntoObject(this.canvas.item(1));
        this.cameraManager.zoomIntoObject(character1?.instance);

        setTimeout(() => {
          character1.walk(0.5 * window.innerWidth, 2000); // Bob walks to the center in 2 seconds.

          setTimeout(() => {
            this.cameraManager.zoomIntoObject(character2?.instance);
            setTimeout(() => {
              character2.walk(character2.left - 50, 1500); // Bob walks closer to Tod, just 50 pixels away, in 1.5 seconds.
              setTimeout(() => {
                this.cameraManager.zoomIntoObject(character1?.instance);
                setTimeout(() => {
                  this.cameraManager.zoomIntoObject(character2?.instance);
                }, 3000);
              }, 3000);
            }, 3000);
          }, 3000);
        }, 3000);
      }, 3000);
    });
  }
  addBackground(imagePath: string, callback: () => void) {
    const imageObj = new Image();

    imageObj.onload = () => {
      const imgInstance = new fabric.Image(imageObj, {
        left: -300,
        top: -300,
        angle: 0,
        opacity: 1,
      });
      imgInstance.width = window.innerWidth;
      imgInstance.height = window.innerHeight;
      imgInstance.scale(1.5);
      this.canvas.add(imgInstance);
      this.canvas.sendToBack(imgInstance);
      callback();
    };
    imageObj.src = "scene/" + imagePath;
  }
  addCharacter(character: Character, left?: number) {
    const imageObj = new Image();

    imageObj.onload = () => {
      const imgInstance = new fabric.Image(imageObj, {
        left: left || 0,
        top: window.innerHeight - 300,
        angle: 0,
        opacity: 1,
      });
      character.instance = imgInstance;
      //   imgInstance.width = window.innerWidth;
      //   imgInstance.height = window.innerHeight;
      this.canvas.add(imgInstance);
    };
    imageObj.src = "character/" + character.getImagePath();
    console.log("character/" + character.getImagePath());
  }
}
