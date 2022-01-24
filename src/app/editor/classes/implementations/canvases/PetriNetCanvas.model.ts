import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { StageConfig } from "konva/lib/Stage";
import { ArcGraphic } from "../../objects/arcGraphic.model";
import { CustomCanvasBase } from "../../bases/CustomCanvasBase.model";
import { PetriNetCanvasModeBase } from "../../bases/PetriNetCanvasModeBase.model";
import { PlaceGraphic } from "../../objects/placeGraphic.model";
import { TransitionGraphic } from "../../objects/transitionGraphic.model";
import { Placeholder } from "@angular/compiler/src/i18n/i18n_ast";


export class PetriNetCanvas extends CustomCanvasBase {

  places: Array<PlaceGraphic> = [];
  arcs: Array<ArcGraphic> = [];
  transitions: Array<TransitionGraphic> = [];

  objectLayer: Konva.Layer;
  gridLayer: Konva.Layer;

  transformer: Konva.Transformer;
  selectionRectangle: Konva.Rect;

  gridCellSize: number = 15;
  blockGridSize: number = this.gridCellSize * 5;

  constructor(config: StageConfig) {
    super(config);

    this.gridLayer = new Konva.Layer();
    this.drawGrid(this.gridLayer);
    this.add(this.gridLayer);

    this.objectLayer = new Konva.Layer();
    this.add(this.objectLayer);


    //#region Pridani zakladnich objektu na testovani
    this.places.push(new PlaceGraphic(this.gridCellSize * 10,this.gridCellSize * 10));
    this.places.push(new PlaceGraphic(this.gridCellSize * 10,this.gridCellSize * 20));
    this.places.push(new PlaceGraphic(this.gridCellSize * 10,this.gridCellSize * 30));

    this.transitions.push(new TransitionGraphic(this.gridCellSize * 20,this.gridCellSize * 10));
    this.transitions.push(new TransitionGraphic(this.gridCellSize * 20,this.gridCellSize * 20));
    this.transitions.push(new TransitionGraphic(this.gridCellSize * 20,this.gridCellSize * 30));

    this.places.push(new PlaceGraphic(this.gridCellSize * 30,this.gridCellSize * 10));
    this.places.push(new PlaceGraphic(this.gridCellSize * 30,this.gridCellSize * 20));
    this.places.push(new PlaceGraphic(this.gridCellSize * 30,this.gridCellSize * 30));

    this.objectLayer.add(...this.places);
    this.objectLayer.add(...this.transitions);
    //#endregion

    this.transformer = new Konva.Transformer({
      anchorSize: 7,
      rotateEnabled: false,
      shouldOverdrawWholeArea: true,
      resizeEnabled: false,
    });
    this.transformer.padding(5);

    this.objectLayer.add(this.transformer);

    this.selectionRectangle = new Konva.Rect({
      //fill: 'rgba(0,0,0,0.5)',
      stroke: 'black',
      dash: [7,3],
      visible: false,
    });
    this.objectLayer.add(this.selectionRectangle);

    this.on('mousedown', (e: KonvaEventObject<MouseEvent>) => {
      this.onMouseDown(e);
    });
    this.on('mousemove', (e: KonvaEventObject<MouseEvent>) => {
      this.onMouseMove(e);
    });
    this.on('mouseup', (e: KonvaEventObject<MouseEvent>) => {
      this.onMouseUp(e);
    });
    this.on('dragmove', (e: KonvaEventObject<MouseEvent>) => {
      this.onMouseDrag(e);
    });


   /* let tr = new Konva.Transformer({
      anchorSize: 7,
      shouldOverdrawWholeArea: true,
      draggable: false
    });
    let place = new PlaceGraphic(250,250);
    place.draggable(false);
    this.objectLayer.add(tr);
    this.objectLayer.add(place);
    //tr.nodes([place]);

    tr.nodes(this.transitions);*/
    //this.transformer.nodes(this.transitions);

  }

  onMouseDown(e: KonvaEventObject<MouseEvent>) {
    if (this.selectedMode) {
      this.selectedMode.onMouseDown(e);
    }
  }
  onMouseUp(e: KonvaEventObject<MouseEvent>): void {
    if (this.selectedMode) {
      this.selectedMode.onMouseUp(e);
    }
  }
  onMouseMove(e: KonvaEventObject<MouseEvent>): void {
    if (this.selectedMode) {
      this.selectedMode.onMouseMove(e);
    }
  }
  onMouseDrag(e: KonvaEventObject<MouseEvent>): void {
    if (this.selectedMode) {
      this.selectedMode.onMouseDrag(e);
    }
  }

  changeMode(newMode: PetriNetCanvasModeBase): void {
    // Are modes the same?
    if (this.selectedMode?.constructor == newMode.constructor) {
      return;
    }

    this.selectedMode?.onExit();
    this.selectedMode = newMode;
    this.selectedMode.onEnter();
  }

  drawGrid(layer: Konva.Layer): void {
    let xOffset = this.gridCellSize;
    let yOffset = this.gridCellSize;
    let numberOfCols = this.width() / xOffset;
    let numberOfRows = this.height() / yOffset;

    for (let i = 1; i < numberOfCols; i++) {
      let line = new Konva.Line({
        x: i * xOffset,
        y: 0,
        points: [0, 0, 0, this.width()],
        stroke: 'rgb(167,164,164)',
        opacity: .2,
        listening: false
      });

      if (i * xOffset % this.blockGridSize === 0) {
        line.stroke('black');
      }

      layer.add(line);
    }
    for (let i = 1; i < numberOfRows; i++) {
      let line = new Konva.Line({
        x: 0,
        y: i * yOffset,
        points: [0, 0, this.height(), 0],
        stroke: 'rgb(167,164,164)',
        opacity: .2,
        listening: false
      });

      if (i * yOffset % this.blockGridSize === 0) {
        line.stroke('black');
      }

      layer.add(line);
    }
  }

}
