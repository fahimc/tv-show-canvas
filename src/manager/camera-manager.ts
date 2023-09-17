import { fabric } from "fabric";
import { Camera } from "./camera";

export class CameraManager {
  private canvas: fabric.Canvas;
  private cameras: Camera[] = [];
  private currentCamera = 0;
  constructor(canvas: fabric.Canvas) {
    this.canvas = canvas;
  }
  addCamera(camera: Camera) {
    this.cameras.push(camera);
  }
  switchCamera(cameraIndex: number) {
    if (cameraIndex < 0 || cameraIndex >= this.cameras.length) return;
    this.currentCamera = cameraIndex;

    let camera = this.cameras[cameraIndex];
    this.canvas.zoomToPoint(new fabric.Point(0, 0), camera.zoom);
    this.canvas.absolutePan(new fabric.Point(camera.left, camera.top));
  }

  zoomCamera(targetZoom: number) {
    let startZoom = this.canvas.getZoom();

    this.animate((progress: any) => {
      let currentZoom = startZoom + (targetZoom - startZoom) * progress;
      this.canvas.zoomToPoint(new fabric.Point(0, 0), currentZoom);
    }, 500);
  }

  panCamera(targetDeltaX: number, targetDeltaY: number) {
    if (!this.canvas.viewportTransform) return;
    let startLeft = -this.canvas.viewportTransform[4];
    let startTop = -this.canvas.viewportTransform[5];

    this.animate((progress: any) => {
      let deltaX = targetDeltaX * progress;
      let deltaY = targetDeltaY * progress;

      this.canvas.absolutePan(
        new fabric.Point(startLeft + deltaX, startTop + deltaY)
      );
    }, 500);
  }

  zoomIntoObject(obj: any, targetZoom = 2) {
    let objCenter = obj.getCenterPoint();
    let viewportCenter = new fabric.Point(
      (this.canvas as any).width / 2,
      (this.canvas as any).height / 2
    );

    // Calculate how the object's position changes due to the zoom
    let zoomedPosition = new fabric.Point(
      objCenter.x * targetZoom,
      objCenter.y * targetZoom
    );

    // Calculate the pan adjustments needed to center the zoomed object
    let adjustedPan = new fabric.Point(
      zoomedPosition.x - viewportCenter.x,
      zoomedPosition.y - viewportCenter.y
    );

    if (!this.canvas.viewportTransform) return;

    let startZoom = this.canvas.getZoom();
    let startPan = new fabric.Point(
      -this.canvas.viewportTransform[4],
      -this.canvas.viewportTransform[5]
    );

    this.animate((progress: any) => {
      let currentZoom = startZoom + (targetZoom - startZoom) * progress;
      let currentPanX = startPan.x + (adjustedPan.x - startPan.x) * progress;
      let currentPanY = startPan.y + (adjustedPan.y - startPan.y) * progress;

      this.canvas.zoomToPoint(objCenter, currentZoom);
      this.canvas.absolutePan(new fabric.Point(currentPanX, currentPanY));
    }, 500);
  }
  animate(action: any, duration: number) {
    let startTime = new Date().getTime();
    function animateStep() {
      let now = new Date().getTime();
      let progress = Math.min(1, (now - startTime) / duration);

      action(progress);

      if (progress < 1) {
        requestAnimationFrame(animateStep);
      }
    }
    animateStep();
  }
}
