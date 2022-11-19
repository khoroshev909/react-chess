import React, {FC} from 'react';
import {Figure} from "../models/figures/Figure";

interface LostFiguresProps {
    title: string,
    figures: Figure[]
}

const LostFiguresComponent:FC<LostFiguresProps> = ({ title, figures }) => {
    return (
        <div className="lost">
            <h5>{title}</h5>
            {figures.map((figure) => (
                <div>
                    {figure.name} {figure.logo && <img width="30px" height="30px" src={figure.logo}/>}
                </div>
            ))}
        </div>
    );
};

export default LostFiguresComponent;