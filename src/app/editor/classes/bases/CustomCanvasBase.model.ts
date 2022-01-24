import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { ModeBase } from './ModeBase.model';

export abstract class CustomCanvasBase extends Konva.Stage {

  selectedMode: ModeBase | undefined;

  abstract changeMode(newMode: ModeBase): void;

  abstract onMouseDown(e: KonvaEventObject<MouseEvent>): void;
  abstract onMouseUp(e: KonvaEventObject<MouseEvent>): void;
  abstract onMouseMove(e: KonvaEventObject<MouseEvent>): void;
  abstract onMouseDrag(e: KonvaEventObject<MouseEvent>): void;
}
