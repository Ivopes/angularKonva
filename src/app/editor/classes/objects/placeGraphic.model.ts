import Konva from "konva";

export class PlaceGraphic extends Konva.Circle {

  orderInLayer = 10;

  /**
   *
   */
  constructor(x: number, y: number) {
    super({
      x: x,
      y: y,
      //radius: 25,
      width: 50,
      height: 50,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 5,
      draggable: true
    });

  }


}
