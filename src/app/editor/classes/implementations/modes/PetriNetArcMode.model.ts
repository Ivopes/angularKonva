import { KonvaEventObject } from "konva/lib/Node";
import { ArcGraphic } from "../../objects/arcGraphic.model";
import { PetriNetCanvasModeBase } from "../../bases/PetriNetCanvasModeBase.model";

export class PetriNetArcMode extends PetriNetCanvasModeBase {


  arcToDraw: ArcGraphic | undefined;

  onEnter(): void {
  }
  onExit(): void {
    if (this.arcToDraw) {
      this.arcToDraw.destroy();
    }
  }
  onMouseDown(e: KonvaEventObject<MouseEvent>): void {
    if (!this.arcToDraw) {
      if (ArcGraphic.canConnectFrom(e.target as any)) {

        let mousePosition = this.ctx.getPointerPosition();

        this.arcToDraw = new ArcGraphic(e.target as any, mousePosition?.x!, mousePosition?.y!, undefined);

        this.ctx.objectLayer.add(this.arcToDraw);
        this.arcToDraw.moveToBottom();
      }
    } else {
      if (this.arcToDraw.canConnectTo(e.target as any)) {

        this.arcToDraw.connectTo(e.target as any);

        this.ctx.arcs.push(this.arcToDraw);
        this.arcToDraw = undefined;
      }
    }
  }
  onMouseUp(e: KonvaEventObject<MouseEvent>): void {
  }
  onMouseMove(e: KonvaEventObject<MouseEvent>): void {
    if (this.arcToDraw) {
      let mousePosition = this.ctx.getPointerPosition();

      this.arcToDraw.setEndPosition(mousePosition?.x!, mousePosition?.y!);
    }
  }
  onMouseDrag(e: KonvaEventObject<MouseEvent>): void {
  }
}
