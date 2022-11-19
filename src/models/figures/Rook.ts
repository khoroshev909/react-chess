import {Figure, FigureNames} from "./Figure";
import {Cell} from "../Cell";
import {Colors} from "../Colors";
import blackLogo from "../../assets/black-rook.png";
import whiteLogo from "../../assets/white-rook.png";


export class Rook extends Figure {

    constructor(cell: Cell, color: Colors) {
        super(cell, color);
        this.name = FigureNames.ROOK
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
    }

    public canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false

        if (this.cell.isEmptyVertical(target)) {
            return true
        }

        if (this.cell.isEmptyHorizontal(target)) {
            return true
        }

        return false
    }

}