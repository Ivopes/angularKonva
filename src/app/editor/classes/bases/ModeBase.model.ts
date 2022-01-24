import { KonvaEventObject } from "konva/lib/Node";

export abstract class ModeBase {

  name: string = '';

  abstract onEnter(): void;
  abstract onExit(): void;
  abstract onMouseDown(e: KonvaEventObject<MouseEvent>): void;
  abstract onMouseUp(e: KonvaEventObject<MouseEvent>): void;
  abstract onMouseMove(e: KonvaEventObject<MouseEvent>): void;
  abstract onMouseDrag(e: KonvaEventObject<MouseEvent>): void;
}
