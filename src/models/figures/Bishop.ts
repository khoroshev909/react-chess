import {Figure, FigureNames} from "./Figure";
import {Cell} from "../Cell";
import {Colors} from "../Colors";
import blackLogo from "../../assets/black-bishop.png";
import whiteLogo from "../../assets/white-bishop.png";


export class Bishop extends Figure {

    constructor(cell: Cell, color: Colors) {
        super(cell, color);
        this.name = FigureNames.BISHOP
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
    }

    public canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false

        if (this.cell.isEmptyDiagonal(target)) {
            return true
        }

        return false
    }

}