import {Figure, FigureNames} from "./Figure";
import {Cell} from "../Cell";
import {Colors} from "../Colors";
import blackLogo from "../../assets/black-pawn.png";
import whiteLogo from "../../assets/white-pawn.png";

export class Pawn extends Figure {

    isFirstStep: boolean = true

    constructor(cell: Cell, color: Colors) {
        super(cell, color);
        this.name = FigureNames.PAWN
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
    }

    public canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false

        const directon = this.cell.figure?.color === Colors.BLACK ? -1 : 1
        const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? -2 : 2

        if ((target.y === this.cell.y + directon || this.isFirstStep
            && (target.y === this.cell.y + firstStepDirection))
        && target.x === this.cell.x
        && this.cell.board.getCell(target.x, target.y).isEmpty()) {
            return true
        }

        if (target.y === this.cell.y + directon
            && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
            && this.cell.isEnemy(target)){
            return true
        }

        return false
    }

    public moveFigure(target: Cell) {
        super.moveFigure(target);
        this.isFirstStep = false
    }

}