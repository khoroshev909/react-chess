import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Queen} from "./figures/Queen";
import {Pawn} from "./figures/Pawn";
import {King} from "./figures/King";
import {Bishop} from "./figures/Bishop";
import {Knight} from "./figures/Knight";
import {Rook} from "./figures/Rook";
import {Figure} from "./figures/Figure";
import {useEffect} from "react";

export class Board {
    cells: Cell[][] = []
    lostWhiteFigures: Figure[] = []
    lostBlackFigures: Figure[] = []

    initCells() {
        for (let i = 0; i < 8; i++) {
            const row:Cell[] = []
            for (let j = 0; j < 8; j++) {
                const color = (j + i) % 2 === 0 ? Colors.WHITE : Colors.BLACK
                row.push(new Cell(this, j, i, color, null))
            }
            this.cells.push(row)
        }
    }

    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for (let j = 0; j < row.length; j++) {
                const target = row[j]
                target.avaliable = !!selectedCell?.figure?.canMove(target)
            }
        }
    }

    public updateBoard() {
        const newBoard = new Board()
        newBoard.cells = this.cells
        newBoard.lostWhiteFigures = this.lostWhiteFigures
        newBoard.lostBlackFigures = this.lostBlackFigures
        return newBoard
    }

    public getCell(x: number, y: number) {
        return this.cells[y][x]
    }

    private addPawns() {
        for (let i = 0; i < 8; i++) {
            new Pawn(this.getCell(i, 1), Colors.WHITE)
            new Pawn(this.getCell(i, 6), Colors.BLACK)
        }
    }

    private addKings() {
        new King(this.getCell(4, 0), Colors.WHITE)
        new King(this.getCell(4, 7), Colors.BLACK)
    }

    private addQueens() {
        new Queen(this.getCell(3, 0), Colors.WHITE)
        new Queen(this.getCell(3, 7), Colors.BLACK)
    }

    private addBishops() {
        new Bishop(this.getCell(2, 0), Colors.WHITE)
        new Bishop(this.getCell(5, 0), Colors.WHITE)
        new Bishop(this.getCell(2, 7), Colors.BLACK)
        new Bishop(this.getCell(5, 7), Colors.BLACK)
    }

    private addKnigts() {
        new Knight(this.getCell(1, 0), Colors.WHITE)
        new Knight(this.getCell(6, 0), Colors.WHITE)
        new Knight(this.getCell(1, 7), Colors.BLACK)
        new Knight(this.getCell(6, 7), Colors.BLACK)
    }

    private addRooks() {
        new Rook(this.getCell(0, 0), Colors.WHITE)
        new Rook(this.getCell(7, 0), Colors.WHITE)
        new Rook(this.getCell(0, 7), Colors.BLACK)
        new Rook(this.getCell(7, 7), Colors.BLACK)
    }

    public addFigures() {
        this.addPawns()
        this.addKings()
        this.addQueens()
        this.addBishops()
        this.addKnigts()
        this.addRooks()
    }
}