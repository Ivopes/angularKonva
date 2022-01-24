import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Stage } from "konva/lib/Stage";
import { PetriNetCanvasModeBase } from "../../bases/PetriNetCanvasModeBase.model";
import { ArcGraphic } from "../../objects/arcGraphic.model";

export class PetriNetMouseMode extends PetriNetCanvasModeBase {

  x1!: number;
  y1!: number;
  x2!: number;
  y2!: number;

  onEnter(): void {
    this.ctx.transitions.forEach(t => {
      t.draggable(true);
    });
    this.ctx.places.forEach(p => {
      p.draggable(true);
    });

  }
  onExit(): void {
    this.ctx.transitions.forEach(t => {
      t.draggable(false);
    });
    this.ctx.places.forEach(p => {
      p.draggable(false);
    });

    // disable selection rect
    setTimeout(() => {
      this.ctx.selectionRectangle.visible(false);
      this.ctx.selectionRectangle.width(0);
      this.ctx.selectionRectangle.height(0);
    });

    // disable transformer
    this.ctx.transformer.detach();
  }

  onMouseDown(e: KonvaEventObject<MouseEvent>): void {
    // do nothing if we mousedown on any shape
    if (e.target !== this.ctx) {
      if (this.ctx.transformer.nodes().includes(e.target as any)) {
        return;
      }

      // Replace selection if clicked on another shape outside transformer
      if (this.ctx.transitions.includes(e.target as any) || this.ctx.places.includes(e.target as any) || this.ctx.arcs.includes(e.target as any)) {
        this.ctx.transformer.nodes([e.target as any]);
      }
      return;
    }
    e.evt.preventDefault();
    this.x1 = this.ctx.getPointerPosition()!.x;
    this.y1 = this.ctx.getPointerPosition()!.y;
    this.x2 = this.ctx.getPointerPosition()!.x;
    this.y2 = this.ctx.getPointerPosition()!.y;

    this.ctx.selectionRectangle.visible(true);
    this.ctx.selectionRectangle.width(0);
    this.ctx.selectionRectangle.height(0);

  }
  onMouseUp(e: KonvaEventObject<MouseEvent>): void {
    // do nothing if we didn't start selection
    if (!this.ctx.selectionRectangle.visible()) {
      return;
    }
    e.evt.preventDefault();
    // update visibility in timeout, so we can check it in click event
    setTimeout(() => {
      this.ctx.selectionRectangle.visible(false);
    });

    // Select shapes within selection rect
    let allShapes: Konva.Shape[] = [...this.ctx.places, ...this.ctx.transitions];
    let box = this.ctx.selectionRectangle.getClientRect();
    let selected = allShapes.filter((shape) => {

      return Konva.Util.haveIntersection(box, { x: shape.x(), y: shape.y(), width: 3, height: 3})
      //return Konva.Util.haveIntersection(box, shape.getClientRect())
    });


    //console.log(this.ctx.objectLayer.getIntersection({x:75, y:75}));

    var selectedArcs = this.ctx.arcs.filter((arc) => {
      for ( let point of arc.registerSelectHitsPoints) {
        let hitted = this.ctx.objectLayer.getIntersection(point);
        if (hitted === this.ctx.selectionRectangle) {
          return true;
        }
      }
      return false;
    });

    selected.push(...selectedArcs);
    this.ctx.transformer.nodes(selected);

    // Only arcs selected
    if (selected.length > 0 && selected.every((s) => s instanceof ArcGraphic)) {
      this.ctx.transformer.shouldOverdrawWholeArea(false);
      //this.ctx.transformer.shoul
    } else {
      this.ctx.transformer.shouldOverdrawWholeArea(true);
    }
  }
  onMouseMove(e: KonvaEventObject<MouseEvent>): void {
    // do nothing if we didn't start selection
    if (this.ctx.selectionRectangle.visible()) {
      e.evt.preventDefault();

      // Update selection rectangle size, by mouse moving
      this.x2 = this.ctx.getPointerPosition()!.x;
      this.y2 = this.ctx.getPointerPosition()!.y;

      this.ctx.selectionRectangle.setAttrs({
        x: Math.min(this.x1, this.x2),
        y: Math.min(this.y1, this.y2),
        width: Math.abs(this.x2 - this.x1),
        height: Math.abs(this.y2 - this.y1),
      });
    }
  }

  onMouseDrag(e: KonvaEventObject<MouseEvent>): void {
    this.snapToGrid(e.target as any);

    // TODO: potencional performance issue fix
    this.ctx.arcs.forEach(arc => {
      arc.updatePosition();
    });

    // let transformer update itself, because we forced position change by grid snapping
    if (this.ctx.transformer.nodes()) {
      this.ctx.transformer.forceUpdate();
    }
  }

  /**
   * Snaps shape to the canvas grid
   * @param shape shape to snap
   */
  snapToGrid(shape: Konva.Shape): void {
      shape.position({
        x: Math.round(shape.x() / this.ctx.gridCellSize) * this.ctx.gridCellSize,
        y: Math.round(shape.y() / this.ctx.gridCellSize) * this.ctx.gridCellSize
      });
  }
}
