import {Cell} from "../Cell";
import {Colors} from "../Colors";
import logo from '../../assets/black-king.png'

export enum FigureNames {
    FIGURE = 'FIGURE',
    KNIGHT = 'Конь',
    KING = 'Король',
    PAWN = 'Пешка',
    QUEEN = 'Ферзь',
    ROOK = 'Ладья',
    BISHOP = 'Слон',
}

export class Figure {
    color: Colors
    cell: Cell
    id: number
    name: FigureNames
    logo: typeof logo

    constructor(cell: Cell, color: Colors) {
        this.cell = cell
        this.color = color
        this.cell.figure = this
        this.id = Math.random()
        this.name = FigureNames.FIGURE
        this.logo = logo
    }

    public canMove(target: Cell): boolean {
        if (target?.figure?.color === this.color) {
            return false
        }
        if (target?.figure?.name === FigureNames.KING) {
            return false
        }
        return true
    }

    public moveFigure(target: Cell) {

    }
}