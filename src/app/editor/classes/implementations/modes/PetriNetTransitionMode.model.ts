import { KonvaEventObject } from "konva/lib/Node";
import { PetriNetCanvasModeBase } from "../../bases/PetriNetCanvasModeBase.model";
import { TransitionGraphic } from "../../objects/transitionGraphic.model";

export class PetriNetTransitionMode extends PetriNetCanvasModeBase {

  transitionToDraw: TransitionGraphic | undefined;

  onEnter(): void {
  }
  onExit(): void {
    if (this.transitionToDraw) {
      this.transitionToDraw.destroy();
    }
  }
  onMouseDown(e: KonvaEventObject<MouseEvent>): void {
    if (this.transitionToDraw) {
      this.ctx.transitions.push(this.transitionToDraw);
      this.transitionToDraw = undefined;
    }
  }
  onMouseUp(e: KonvaEventObject<MouseEvent>): void {
  }
  onMouseMove(e: KonvaEventObject<MouseEvent>): void {
    if (!this.transitionToDraw) {
      let position = this.ctx.getPointerPosition();
      this.transitionToDraw = new TransitionGraphic(position?.x!, position?.y!);

      this.ctx.objectLayer.add(this.transitionToDraw);
    }
    let position = this.ctx.getPointerPosition();
    this.transitionToDraw.setPosition({
      x: position?.x!,
      y: position?.y!
    });
  }
  onMouseDrag(e: KonvaEventObject<MouseEvent>): void {
  }
}
