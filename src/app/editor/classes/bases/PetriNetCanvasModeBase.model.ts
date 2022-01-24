import { PetriNetCanvas } from "../implementations/canvases/PetriNetCanvas.model";
import { ModeBase } from "./ModeBase.model";

export abstract class PetriNetCanvasModeBase extends ModeBase {

  ctx: PetriNetCanvas;

  constructor(petriNetCanvas: PetriNetCanvas) {
    super();

    this.ctx = petriNetCanvas;
  }
}
