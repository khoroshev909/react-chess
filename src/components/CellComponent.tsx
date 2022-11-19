import React, {FC} from 'react';
import {Cell} from "../models/Cell";

interface CellProps {
    cell: Cell,
    selected: boolean,
    click: (cell: Cell) => void
}

const CellComponent:FC<CellProps> = ({cell, selected, click}) => {
    return (
        <div
            className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
            style={{background: cell.avaliable && cell.figure ? 'green' : ''}}
            onClick={() => click(cell)}>

            {cell.avaliable && !cell.figure && <div className={'avaliable'}/>}

            {cell.figure?.logo && <img src={cell.figure.logo}></img>}
        </div>
    );
};

export default CellComponent;