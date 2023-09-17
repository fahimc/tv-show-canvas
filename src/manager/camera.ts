export class Camera {
  zoom = 1;
  left = 0;
  top = 0;
  constructor(zoom: number, left: number, top: number) {
    this.zoom = zoom;
    this.left = left;
    this.top = top;
  }
}
