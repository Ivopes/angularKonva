import Konva from "konva";
import { Vector2d } from "konva/lib/types";
import { PlaceGraphic } from "./placeGraphic.model";
import { TransitionGraphic } from "./transitionGraphic.model";

export class ArcGraphic extends Konva.Arrow {

  objectFrom: PlaceGraphic | TransitionGraphic;
  objectTo: PlaceGraphic | TransitionGraphic | undefined;

  startFromPlace: boolean | undefined;

  orderInLayer = 5;

  registerSelectHitsPoints: Vector2d[] = [];

  /**
   *
   */
  constructor(objectFrom: PlaceGraphic | TransitionGraphic, x2: number, y2: number, objectTo: PlaceGraphic | TransitionGraphic | undefined) {
    super({
      x: (x2 - objectFrom.x()) / 2 + objectFrom.x(),
      y: (y2 - objectFrom.y()) / 2 + objectFrom.y(),
      offsetX: (x2 - objectFrom.x()) /2,
      offsetY: (y2 - objectFrom.y()) /2,
      points: [0, 0, (x2 - objectFrom.x()), (y2 - objectFrom.y())],
      stroke: 'black',
      fill: 'black',
      pointerLength: 10,
      pointerWidth: 10,
      listening: false,
      draggable: false,
    });

    this.startFromPlace = objectFrom instanceof PlaceGraphic;

    this.objectFrom = objectFrom;

    if (objectTo) {
      if (this.startFromPlace && objectTo instanceof PlaceGraphic) {
        throw new Error('Wrong end point object type, based on start');
      }
      this.objectTo = objectTo;
      this.updatePosition();
    }


  }

  setEndPosition(x2: number, y2: number): void {
    if (!this.objectFrom) {
      throw new Error('No object from');
    }
    //this.x((x2 - this.objectFrom.x()) / 2 + this.objectFrom.x());
    //this.y((y2 - this.objectFrom.y()) / 2 + this.objectFrom.y());
    //this.offsetX((x2 - this.objectFrom.x()) /2);
    //this.offsetY((y2 - this.objectFrom.y()) /2);

    //this.points([0, 0, (x2 - this.objectFrom.x()), (y2 - this.objectFrom.y())]);

    let deltaX = (x2 - this.objectFrom.x()!);
    let deltaY = (y2 - this.objectFrom.y());

    let length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    let angle = Math.atan2(deltaY, deltaX) * (180/Math.PI);

    this.x(deltaX / 2 + this.objectFrom.x());
    this.y(deltaY / 2 + this.objectFrom.y());

    this.offsetX(length/2);
    this.offsetY(0);

    let points = [0, 0, length, 0];
    this.points(points);

    this.registerSelectHitsPoints = []

    this.rotation(angle);

    // Set points for registering click & selections
    this.registerSelectHitsPoints = [];
    let nOfDivisions = Math.floor(length / 15);

    for (let i = 0; i <= nOfDivisions; i++) {

      this.registerSelectHitsPoints.push({
        x: (deltaX * 0.6) / nOfDivisions * i + this.objectFrom.x() + (deltaX * 0.2) ,
        y: (deltaY * 0.6) / nOfDivisions * i + this.objectFrom.y() + (deltaY * 0.2) ,
      });
    }
  }
  static canConnectFrom(connectTo: Konva.Shape) {
    return connectTo instanceof PlaceGraphic || connectTo instanceof TransitionGraphic;
  }

  updatePosition(): void {
    if (!this.objectTo) {
      throw new Error('Obejct has to have end object to update position');
    }
    this.setEndPosition(this.objectTo.x(), this.objectTo.y());
  }

  canConnectTo(connectTo: Konva.Shape): boolean {

    if (!this.objectFrom) {
      return true;
    }
    if (this.objectFrom instanceof PlaceGraphic) {
      return connectTo instanceof TransitionGraphic;
    }
    if (this.objectFrom instanceof TransitionGraphic) {
      return connectTo instanceof PlaceGraphic
    }

    return false;
  }

  connectTo(connectTo: Konva.Shape): void {
    if (!this.canConnectTo(connectTo)) {
      throw new Error('Cant connect to this object');
    }
    this.objectTo = connectTo as any;

    this.setEndPosition(this.objectTo?.x()!, this.objectTo?.y()!);
  }
}
