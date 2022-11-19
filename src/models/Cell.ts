import {Figure} from "./figures/Figure";
import {Board} from "./Board";
import {Colors} from "./Colors";

export class Cell {
    readonly id: number;
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: null | Figure;
    board: Board;
    avaliable: boolean;

    constructor(board: Board, x: number, y: number, color: Colors, figure: null | Figure) {
        this.board = board
        this.id = Math.random()
        this.x = x
        this.y = y
        this.color = color
        this.figure = figure
        this.avaliable = false
    }

    public setFigure(figure: Figure) {
        this.figure = figure
        this.figure.cell = this
    }

    public setLostFigures(figure: Figure) {
        figure.color === Colors.BLACK
            ? this.board.lostBlackFigures.push(figure)
            : this.board.lostWhiteFigures.push(figure)
    }

    public moveFigure(target: Cell) {
        if (this.figure && this.figure?.canMove(target)) {
            this.figure.moveFigure(target)

            if (target.figure) {
                this.setLostFigures(target.figure)
            }

            target.setFigure(this.figure)
            this.figure = null
        }
    }

    public isEmpty(): boolean {
        return this.figure === null
    }

    public isEnemy(target: Cell): Boolean {
        if (target.figure) {
            return target.figure.color !== this.figure?.color
        }
        return false
    }

    public isEmptyVertical(target: Cell): boolean {
        if (target.x !== this.x) {
            return false
        }

        const min = Math.min(this.y, target.y)
        const max = Math.max(this.y, target.y)

        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty()) {
                return false
            }
        }

        return true
    }

    public isEmptyHorizontal(target: Cell): boolean {
        if (target.y !== this.y) {
            return false
        }

        const min = Math.min(this.x, target.x)
        const max = Math.max(this.x, target.x)

        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false
            }
        }

        return true
    }

    public isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x)
        const absY = Math.abs(target.y - this.y)
        if (absY !== absX) {
            return false
        }

        const dy = this.y < target.y ? 1 : -1
        const dx = this.x < target.x ? 1 : -1

        for (let i = 1; i < absY; i++) {
            if (!this.board.getCell(this.x + i*dx, this.y + i*dy).isEmpty()) {
                return false
            }
        }

        return true
    }
}