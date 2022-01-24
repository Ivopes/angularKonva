import { KonvaEventObject } from "konva/lib/Node";
import { PetriNetCanvasModeBase } from "../../bases/PetriNetCanvasModeBase.model";
import { PlaceGraphic } from "../../objects/placeGraphic.model";

export class PetriNetPlaceMode extends PetriNetCanvasModeBase {

  placeToDraw: PlaceGraphic | undefined;

  onEnter(): void {
  }
  onExit(): void {
    if (this.placeToDraw) {
      this.placeToDraw.destroy();
    }
  }
  onMouseDown(e: KonvaEventObject<MouseEvent>): void {
    if (this.placeToDraw) {
      this.ctx.places.push(this.placeToDraw);
      this.placeToDraw = undefined;
    }
  }
  onMouseUp(e: KonvaEventObject<MouseEvent>): void {
  }
  onMouseMove(e: KonvaEventObject<MouseEvent>): void {
    if (!this.placeToDraw) {
      this.placeToDraw = new PlaceGraphic(e.evt.offsetX, e.evt.offsetY);

      this.ctx.objectLayer.add(this.placeToDraw);
    }

    this.placeToDraw.setPosition({
      x: e.evt.offsetX,
      y: e.evt.offsetY
    });
  }
  onMouseDrag(e: KonvaEventObject<MouseEvent>): void {
  }
}
