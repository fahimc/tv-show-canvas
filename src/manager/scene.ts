import { fabric } from "fabric";
export interface Scene {
  name: string;
  generate: (canvas: fabric.Canvas, callback: () => void) => void;
  getBackgroundPath: () => string;
}
