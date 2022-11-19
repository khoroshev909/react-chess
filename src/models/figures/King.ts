import {Figure, FigureNames} from "./Figure";
import {Cell} from "../Cell";
import {Colors} from "../Colors";
import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";


export class King extends Figure {

    constructor(cell: Cell, color: Colors) {
        super(cell, color);
        this.name = FigureNames.KING
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
    }

    public canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false

        const directon = this.cell.figure?.color === Colors.BLACK ? -1 : 1

        if ((target.y === this.cell.y + directon)
            && (target.x === this.cell.x || target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
            && (this.cell.board.getCell(target.x, target.y).isEmpty() || this.cell.isEnemy(target))) {
            return true
        }

        return false
    }

}