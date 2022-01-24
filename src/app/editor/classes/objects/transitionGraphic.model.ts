import Konva from "konva";

export class TransitionGraphic extends Konva.Rect {

  trWidth: number = 10;
  trHeight: number = 40;

  orderInLayer = 10;

  /**
   *
   */
  constructor(x: number, y: number) {
    super({
      x: x,
      y: y,
      width: 10,
      height: 40,
      fill: 'black',
      draggable: true,
      offsetX: 10/2,
      offsetY: 40/2
    });
  }


}
