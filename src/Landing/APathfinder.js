import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import "./Pathfinder.css"

const Cell = ({ x, y, size, isStart, isEnd, isWall, isPath }) => {
    const cellRef = useRef(null);

    useEffect(() => {

        const isEmpty = !isStart && !isEnd && !isWall && !isPath

        gsap.to(cellRef.current, {
            duration: 0.25,
            backgroundColor: 
                isStart ? "green" : 
                isEnd ? "red" : 
                isWall ? "black" : 
                isPath ? "blue" : 
                "white",
            width: isEmpty ? "0%" : "100%",
            height: isEmpty ? "0%" : "100%",
        });
    }, [isStart, isEnd, isWall, isPath]);

    return (
        <div
            
            className="pathfinder-cell"
            style={{
                width: `calc(${size}vw)`,
                height: `calc(${size}vw)`,
                display: "inline-block",
                backgroundColor: "white",
                position: "relative",
            }}
        >
            <div
                ref={cellRef} 
                className="pathfinder-cell-child"
                style={{
                    position: "absolute",
                    width: "0%",
                    height: "0%",
                }}>
                    
            </div>
        </div>
    );
};

const Grid = ({ grid, size }) => {


    return (
        <div>
            {grid.map((row, rowIndex) => 
                <div key={rowIndex} className="pathfinder-row" style={{height: {size}}}>
                    {row.map((cell, cellIndex) => (
                        <Cell
                            key={`${rowIndex}-${cellIndex}`}
                            x={cellIndex}
                            y={rowIndex}
                            size={size}
                            isStart={cell.isStart}
                            isEnd={cell.isEnd}
                            isWall={cell.isWall}
                            isPath={cell.isPath}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export const AStarPathfinding = () => {
    const [grid, setGrid] = useState([]);
    const nodeSize = 0.9;
    const width = vw(60) / vw(nodeSize);
    const height = vh(65) / vw(nodeSize);

    const handleRandomizeWalls = () => {
        const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));


        for (let row = 0; row < width - 2; row+=2) {
            for (let col = 0; col < height - 2; col+=2) {

                grid[row][col].isWall = true;

                let ran = Math.random();
                if (ran < 0.444) {
                    //West
                    newGrid[row + 1][col].isWall = false;
                } else if (ran < 0.85) {
                    //North
                    newGrid[row][col + 1].isWall = false;
                } else {
                    newGrid[row + 1][col].isWall = false;
                    newGrid[row][col + 1].isWall = false;
                }
                //North West

                newGrid[row + 2][col + 1].isWall = true;
                newGrid[row + 1][col + 2].isWall = true;
                newGrid[row][col + 2].isWall = true;
                newGrid[row + 2][col].isWall = true;
                newGrid[row + 2][col + 2].isWall = true;

                

            }
        }
        console.log('new maze');
        setGrid(newGrid);
    };

    useEffect(() => {



        const start = getRandom(2, (width - 2) / 2);
        const end = getRandom((height - 2) / 2, (height - 10));

        // Generate initial grid
        const initialGrid = [];
        for (let row = 0; row < width; row++) {
            const currentRow = [];
            for (let col = 0; col < height; col++) {
                currentRow.push({ isStart: false, isEnd: false, isWall: false, isPath: false });
            }
            initialGrid.push(currentRow);
        }
        setGrid(initialGrid);

        // Run A* pathfinding algorithm
        // ...

        // Update grid to show path
        // ...
    }, []);

    return (
        <div className="pathfinder-grid">

            <Grid grid={grid} size={nodeSize} />
            <button className="random-button" onClick={handleRandomizeWalls}>Randomize Walls</button>
        </div>
    );
};

function vw(percent) {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (percent * w) / 100;
}

function vh(percent) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * h) / 100;
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}