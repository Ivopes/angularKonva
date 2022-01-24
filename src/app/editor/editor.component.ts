import { Component, OnInit } from '@angular/core';
import { PetriNetCanvas } from './classes/implementations/canvases/PetriNetCanvas.model';
import { PetriNetArcMode } from './classes/implementations/modes/PetriNetArcMode.model';
import { PetriNetMouseMode } from './classes/implementations/modes/PetriNetMouseMode.model';
import { PetriNetPlaceMode } from './classes/implementations/modes/PetriNetPlaceMode.model';
import { PetriNetTransitionMode } from './classes/implementations/modes/PetriNetTransitionMode.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  modes: string[] = [
    'mouse',
    'place',
    'arc',
    'transition'
  ]

  selected: string  = 'mouse';

  canvas: PetriNetCanvas | undefined;

  menuOpened: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.canvas = new PetriNetCanvas({
      container: 'container',
      width: 600,
      height: 600,
    });

    this.canvas.changeMode(new PetriNetMouseMode(this.canvas));
  }

  changeCanvasMode(mode: string): void {
    switch(mode) {
      case 'mouse': {
        this.canvas?.changeMode(new PetriNetMouseMode(this.canvas));
        break;
      }
      case 'place': {
        this.canvas?.changeMode(new PetriNetPlaceMode(this.canvas));
        break;
      }
      case 'arc': {
        this.canvas?.changeMode(new PetriNetArcMode(this.canvas));
        break;
      }
      case 'transition': {
        this.canvas?.changeMode(new PetriNetTransitionMode(this.canvas));
        break;
      }
    }
    this.selected = mode;
  }
}
