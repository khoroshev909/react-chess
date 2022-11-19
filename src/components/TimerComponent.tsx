import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null,
    restart: () => void
}

const TimerComponent:FC<TimerProps> = ({ currentPlayer, restart }) => {

    const [whiteTime, setWhiteTime] = useState<number>(300)
    const [blackTime, setBlackTime] = useState<number>(300)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = () => {
            currentPlayer?.color === Colors.BLACK
                ? setBlackTime(prev => prev - 1)
                : setWhiteTime(prev => prev - 1)
        }

        timer.current = setInterval(callback, 1000)
    }

    useEffect(() =>  {
        startTimer()
    }, [currentPlayer])

    const restartHandler = () => {
        setBlackTime(300)
        setWhiteTime(300)
        restart()
    }

    return (
        <div>
            <div>
                <button onClick={restartHandler}>Сброить игру</button>
            </div>
            <div>
                Чёрные: {blackTime}
            </div>
            <div>
                Белые: {whiteTime}
            </div>
        </div>
    );
};

export default TimerComponent;