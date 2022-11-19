import React, {FC, useEffect, useState} from 'react';
import {Cell} from "../models/Cell";
import CellComponent from "./CellComponent";
import {Board} from "../models/Board";
import {Player} from "../models/Player";

interface BoardProps {
    board: Board,
    setBoard: (board: Board) => void,
    currentPlayer: Player | null,
    swapPlayer: () => void
}

const BoardComponent:FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    const clickHandler = (cell: Cell) => {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell)
            setSelectedCell(null)
            swapPlayer()
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell)
            }
        }
    }

    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    function highlightCells() {
        board.highlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.updateBoard()
        setBoard(newBoard)
    }

    return (
        <div>
            <h4>Текущий игрок: {currentPlayer?.color}</h4>
            <div className="board">
                {board.cells.map((row, idx) => (
                    <React.Fragment key={idx}>
                        {row.map((cell) => (
                            <CellComponent
                                click={clickHandler}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                cell={cell}
                                key={cell.id}/>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>

    );
};

export default BoardComponent;