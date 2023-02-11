
import { gsap } from "gsap";
import { Queue } from './Queue.js';
import { RowPane } from "./PathfinderRow.js";
import React, { useState, useRef } from "react";


let GRID_CONTAINER = null;

const SEARCHED_1 = 'rgb(122, 116, 251, 1.0)'
const SEARCHED_2 = 'rgb(76, 119, 211, 1)'
const SEARCHED_3 = 'rgb(103, 195, 238, 0.8)'
// const SEARCHED_4 = 'rgb(74, 74, 74, 0.8)'
const SEARCHED_4 = 'rgb(21,23,24,1)'
const SEARCHES = [SEARCHED_1, SEARCHED_2, SEARCHED_3, SEARCHED_4]
const START = '#69d885'
const END = '#d95353'
const EMPTY = 'rgba(25,28,30,1)'
const WALL = '#111111'
const BEST_PATH_1 = 'rgb(255, 154, 131,1)'
const BEST_PATH_2 = 'rgb(226, 183, 136,1)'
const TO_SEARCH = '#151718'

let END_PATH = []
let start_node = null;
let end_node = null;
let GRID = null
let STARTED = false;

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


export const PathfinderGrid = () => {
    const gridRef = useRef(null);
    const nodeRefs = useRef([]);
    const [gridArray, setGridArray] = useState([]);

    const createGrid = () => {
        // Create a 2D array representing the grid
        let grid = [];
        let count = 0;

        for (let i = 0; i < 10; i++) {
            let row = [];
            for (let j = 0; j < 10; j++) {
                row.push(
                    {
                        index: count,
                        x: j,
                        y: i,
                        isWall: false,
                        isStart: false,
                        isEnd: false,
                    });
                count++;
            }
            grid.push(row);
        }
        setGridArray(grid);
    };

    const algorithm = (start, end) => {
        let count = 0;
        let openSet = new Queue();
        openSet.add([0, count, start]);

        let parent = new WeakMap();
        let gScore = new WeakMap();

        for (let i = 0; i < gridArray.length; i++) {
            for (let k = 0; k < gridArray[i].length; k++) {
                gScore.set(gridArray[i][k], Infinity);
            }
        }

        gScore.set(start, 0);
        let fScore = new WeakMap();

        for (let i = 0; i < gridArray.length; i++) {
            for (let k = 0; k < gridArray[i].length; k++) {
                fScore.set(gridArray[i][k], Infinity);
            }
        }

        fScore.set(start, calculateHValue(start, end));

        let openSetHash = [start];
        while (!(openSet.isEmpty())) {

            let current = openSet.get_priority()[2];
            openSetHash.splice(openSetHash.indexOf(current), 1)

            if (current == end) {
                // generate_best_path
                // create_best_path_visual
                //end.setAsEnd()
                //end.udpdate
            }

            for (const neighbor of getNeighbors(current)) {

                let tempGScore = gScore.get(current) + 1;

                if (tempGScore < gScore.get(neighbor)) {
                    parent.set(neighbor, tempGScore);
                    gScore.set(neighbor, tempGScore);
                    fScore.set(neighbor, tempGScore + calculateHValue(neighbor, end));
                    if (!(neighbor in openSetHash)) {
                        count += 1;
                        openSet.add([fScore.get(neighbor), count, neighbor]);
                        openSetHash.push(neighbor);
                    }
                }
            }
        }
    }

    const getNeighbors = (node) => {
        let neighbors = []
        const x = node.x;
        const y = node.y;

        //below
        if (x < (gridArray.length - 1) && !(gridArray[x + 1][y].isWall))
            neighbors.push(gridArray[x + 1][y])

        //above
        if (x > 0 && !(gridArray[x - 1][y].isWall))
            neighbors.push(gridArray[x - 1][y])

        //right
        if (y < (gridArray[0].length - 1) && !(gridArray[x][y + 1].isWall))
            neighbors.push(gridArray[x][y + 1])

        //left
        if (y > 0 && !(gridArray[x][y - 1].isWall))
            neighbors.push(gridArray[x][y - 1])

        return neighbors
    }

    const createRandomMaze = () => {
        for (let i = 0; i < gridArray.length - 2; i += 2) {
            for (let x = 0; x < gridArray[i].length - 2; x += 2) {
                gridArray[i][x].set_as_wall();

                let ran = Math.random();
                if (ran < 0.444) {
                    //West
                    gridArray[i + 1][x].maze_reset();
                } else if (ran < 0.85) {
                    //North
                    gridArray[i][x + 1].maze_reset();
                } else {
                    gridArray[i + 1][x].maze_reset();
                    gridArray[i][x + 1].maze_reset();
                }
                gridArray[i + 2][x + 1].isWall = true;
                gridArray[i + 1][x + 2].isWall = true;
                gridArray[i][x + 2].isWall = true;
                gridArray[i + 2][x].isWall = true;
                gridArray[i + 2][x + 2].isWall = true;
                //North West
            }
        }
    }

    const calculateHValue = (point1, point2) => {
        let x1 = point1.x;
        let y1 = point1.y;
        let x2 = point2.x;
        let y2 = point2.y;
        return Math.abs(x1 - x2) + Math.abs(y1 - y2)
    }

    const animateFinalPath = (nodePositions) => {
        nodePositions.forEach((positions, index) => {
            gsap.to(gridArray[positions.x][positions.y], {

            })
        })
    }

    createGrid();

    return (
        <>
            <div ref={gridRef} style={
                {
                    position: "absolute",
                    backgroundColor: 'orange',
                    right: "0",
                    width: "50vw",
                    height: '100vh',
                    // display: "grid",
                    // gridTemplateColumns: "repeat(1vw, 1vw)"
                }}>
                {gridArray.map((row, rowIndex) => (
                    <div key={rowIndex}>
                        {row.map((node, nodeIndex) => {
                            nodeRefs.current[rowIndex * row.length + nodeIndex] = React.createRef();
                            console.log(rowIndex);
                            return (
                                <div
                                    ref={nodeRefs.current[rowIndex * row.length + nodeIndex]}
                                    key={nodeIndex}
                                    style={{ backgroundColor: node.isWall ? 'black' : 'white', height: "20vw", width: "20vw" }}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </>
    );
}


export class Pathfinder extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ids: new Set()
        }
    }

    /**
     * Runs this method when all the components in Pathfinder have been mounted
     */
    componentDidMount() {

        for (let i = 0; i < GRID.length; i++) {
            for (let k = 0; k < GRID[i].length; k++) {
                GRID[i][k].setSizeAnimation();
            }
        }

        delay(3200).then(() => {

            gsap.to("#grid_container",
                {
                    duration: 1.5,
                    css: {
                        right: '0%',
                    },
                    ease: "power2.out",
                }
            );

            repeatMaze();

        })
    }

    uniqueId = () => {

        let id = Math.floor(Math.random() * 1_000_000);

        while (this.state.ids.has(id)) {
            id = Math.floor(Math.random() * 1_000_000);
        }

        return id;
    }

    generateGrid = (rows, columns, gap, ratioWidth, ratioHeight) => {

        const grid = []
        for (let i = 0; i < rows; i++) {

            //array containing the horizontal rows in the grid
            grid.push([])
            // let gridRow = create_row_pane(gap);

            for (let j = 0; j < columns; j++) {

                //creates a new node
                let node = new Node(this.uniqueId(), i, j, gap, ratioWidth, ratioHeight, rows, columns)
                // gridRow.appendChild(node.draw_initial())

                grid[i].push(node)
            }
            // container.push(gridRow)
        }

        console.log(rows * columns);

        return grid
    }

    render() {

        const nodeSize = 0.9;
        const width = vw(45) / vw(nodeSize);
        const height = vh(100) / (vw(nodeSize));

        const ratioWidth = (1.01)
        const ratioHeight = (height / vh(nodeSize))

        console.log(ratioWidth + ", " + ratioHeight);

        const grid = this.generateGrid(height, width, nodeSize, ratioWidth, ratioHeight)

        GRID = grid;

        let items = []

        grid.forEach((ele, index) => {
            items.push(<RowPane key={index} height={nodeSize} childs={ele}></RowPane>)
        })

        return (
            <div id="grid_container">
                {items}
            </div>
        )
    }
}

class Node {
    constructor(identity, row, col, width, scaleWidth, scaleHeight, total_rows, total_columns) {
        this.row = row
        this.col = col
        this.identity = ("box-" + identity)
        this.x = row * width
        this.y = col * width
        this.color = EMPTY
        this.past_color = EMPTY;
        this.neighbors = []
        this.width = width
        this.total_rows = total_rows
        this.scaleWidth = scaleWidth
        this.scaleHeight = scaleHeight
        this.total_columns = total_columns;
    }

    /**
     * Updates the div object on the HTML page
     */
    update() {
        this.size_animation.play();
        gsap.to(`#${this.identity}`, { duration: 0.1, backgroundColor: this.color })
    }

    update_maze() {
        if (this.color != EMPTY) {
            this.size_animation.play();
            gsap.to(`#${this.identity}`, { duration: 0.1, backgroundColor: this.color })
        }
    }

    //Returns the position of the node
    get_pos() {
        return [this.row, this.col]
    }

    //Sets hte color of the node to be the start
    set_as_start() {
        this.color = START
    }

    //Sets hte color of the node to be the end
    set_as_end() {
        this.color = END
    }

    //Sets the color of the node to be a wall
    set_as_wall() {
        if (this.color != START && this.color != END) {
            this.color = WALL
        }
    }

    get_wall() {
        return this.color == WALL
    }

    //Sets the color of the node to be empty
    set_color(color) {
        if (this.color != START && this.color != END) {
            this.color = color
        }
    }

    //Sets the color of the node to the neighbors that will be searched
    set_as_to_search() {
        this.color = TO_SEARCH
    }

    //Sets the node as empty
    reset() {
        this.color = EMPTY
        gsap.to(`#${this.identity}`, { duration: 0.1, backgroundColor: this.color })
        this.size_animation.reverse();
    }

    maze_reset() {
        if (this.color != START && this.color != END) {
            this.reset();
        }
    }

    /***
     * @return if the node is empty
     */
    isEmpty() {
        return this.color == EMPTY;
    }

    /**
     * Get the node div object
     * @returns the node
     */
    get_node() {
        return this.node;
    }

    /**
     * Get the current color
     * @returns the color being used
     */
    get_color() {
        return this.color;
    }

    setSizeAnimation() {
        this.size_animation = gsap.to(`#${this.identity}`,
            {
                duration: 0.25,
                width: `calc(${this.width}vw + 0.1vw)`,
                height: `calc(${this.width}vw + 0.1vw)`,
                paused: true,
                reversed: true
            })
    }

    /**
     * Creates the initial node and child node inside of it
     * @returns the node div object
     */
    render(key) {


        this.node_child =
            <div id={`${this.identity}`} className="node_child node_element"
                style={{
                    width: `0%`,
                    height: `0%`,
                }}>

            </div>;

        this.node =
            <div key={key}
                className="node_element"
                style={{
                    width: `calc(${this.width}vw)`,
                    height: `calc(${this.width}vw)`,
                    background: `rgb${this.color}`,
                    float: `left`,
                    position: `relative`,
                    overflow: `hidden`
                }}>
                {this.node_child}
            </div>;




        // this.size_animation = gsap.to(this.node_child, 
        //     { 
        //         duration: 0.25, 
        //         borderRadius: '0.1vw',
        //          width: `calc(${this.width}vw + 0.1vw)`, 
        //          height: `calc(${this.width}vw + 0.1vw)`, 
        //          paused: true, 
        //          reversed: true 
        //     })
        return this.node;
    }

}











function repeatMaze() {
    if (start_node != null) {
        start_node.reset()
        start_node = null
    }

    if (end_node != null) {
        end_node.reset();
        end_node = null;
    }

    create_random_maze_binary(function () {
        for (let i = 0; i < 2; i++) {

            let x = null;
            let y = getRandom(10, GRID[0].length - 2);

            if (i == 0) {
                x = getRandom(2, (GRID.length - 2) / 2)
                GRID[x][y].set_as_start();
                start_node = GRID[x][y];
            } else {
                x = getRandom((GRID.length - 2) / 2, (GRID.length - 10))
                GRID[x][y].set_as_end();
                end_node = GRID[x][y];
            }
            GRID[x][y].update();
        }

        start_pathfinder();
    });
}







function create_random_maze_binary(_callback) {
    reset_grid();
    delay(1000).then(() => {

        mazeCreation();

        let count = 0;
        let endX = GRID.length - 10;
        let endY = GRID[0].length - 10;
        for (let i = 0; i < GRID.length / 2; i += 10) {
            for (let x = 0; x < GRID[i].length; x += 10) {
                delay(count).then(() => {
                    for (let a = 0; a <= 10; a++) {
                        for (let b = 0; b <= 10; b++) {
                            if (i >= GRID.length)
                                continue;
                            if ((i + a) < GRID.length && (x + b) < GRID[i].length)
                                GRID[i + a][x + b].update_maze();
                        }
                    }
                });
                delay(count).then(() => {
                    for (let a = 0; a < 10; a++) {
                        for (let b = 0; b < 10; b++) {
                            if (i >= GRID.length)
                                continue;
                            // if(n != null)
                            // console.log(GRID);
                            let p1 = endX - (i - a);
                            let p2 = (endY - (x - b));
                            if ((p1 >= 0 && p1 < GRID.length) && (p2 >= 0 && p2 < GRID[i].length)) {
                                GRID[p1][p2].update_maze();
                            }

                        }
                    }
                });
                count += 50;
            }
        }

        delay(count).then(() => {
            _callback();
        })
    })
}


//calculates distance by using manhatan distance
function calculate_h_value(point_1, point_2) {
    let x1 = point_1[0];
    let y1 = point_1[1];
    let x2 = point_2[0];
    let y2 = point_2[1];
    return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}


//Creates the best path 
function generate_best_path(parents, current) {
    let path = parents.get(current)
    if (path != undefined) {
        END_PATH.push(path);
        generate_best_path(parents, path);
    }
}

//Creates the visual of the path being taken
function create_best_path_visual() {
    let count = 0;
    const path = END_PATH.reverse();
    for (let x = 0; x < path.length; x++) {
        count = count + 20;
        delay(count).then(() => {
            path[x].set_color(BEST_PATH_1)
            path[x].update()
            delay(160).then(() => {
                path[x].set_color(BEST_PATH_2);
                path[x].update()
                if (x == (path.length - 1)) {
                    STARTED = false
                }
            });
        });
    }
    delay(count + 1000).then(() => {
        STARTED = false
        repeatMaze();
    })
    // for (const path of END_PATH.reverse()) {

    // }
}

/**
 * Generates the initial grid
 * @param {*} rows the number of rows
 * @param {*} columns the number of columns
 * @param {*} width the width of each section
 * @returns the generated grid
 */
// let generate_grid = (rows, columns, width) => {
//     let grid = []
//     let gap = width // rows
//     for (let i = 0; i < rows; i++) {

//         //array containing the horizontal rows in the grid
//         grid.push([])
//         let GRID_ROW = create_row_pane(gap);

//         for (let j = 0; j < columns; j++) {

//             //creates a new node
//             let node = new Node(i, j, gap, rows, columns)
//             GRID_ROW.appendChild(node.draw_initial())

//             grid[i].push(node)
//         }

//         GRID_CONTAINER.appendChild(GRID_ROW);
//     }
//     return grid
// }


function mazeCreation() {
    for (let i = 0; i < GRID.length - 2; i += 2) {
        for (let x = 0; x < GRID[i].length - 2; x += 2) {
            GRID[i][x].set_as_wall();

            let ran = Math.random();
            if (ran < 0.444) {
                //West
                GRID[i + 1][x].maze_reset();
            } else if (ran < 0.85) {
                //North
                GRID[i][x + 1].maze_reset();
            } else {
                GRID[i + 1][x].maze_reset();
                GRID[i][x + 1].maze_reset();
            }
            GRID[i + 2][x + 1].set_as_wall();
            GRID[i + 1][x + 2].set_as_wall();
            GRID[i][x + 2].set_as_wall();
            GRID[i + 2][x].set_as_wall();
            GRID[i + 2][x + 2].set_as_wall();
            //North West

        }
    }
}

/**
 * The start of the search algorithm
 * @param {*} grid the grid to search on
 * @param {*} start the starting node
 * @param {*} end the ending node
 * @returns if the algorithm could find a path between the two
 */
function algorithm(grid, start, end) {
    let count = 0
    let open_set = new Queue()
    open_set.add([0, count, start])

    let parent = new WeakMap();
    let g_score = new WeakMap();

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            let key = grid[x][y];
            g_score.set(key, Infinity);
        }
    }

    g_score.set(start, 0)

    let f_score = new WeakMap();

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            let key = grid[x][y];
            f_score.set(key, Infinity);
        }
    }

    f_score.set(start, calculate_h_value(start.get_pos(), end.get_pos()));

    let open_set_hash = [start]
    let searching_delay = 0;

    while (!(open_set.isEmpty())) {

        searching_delay = searching_delay + 10;

        let current = open_set.get_priority()[2];

        open_set_hash.splice(open_set_hash.indexOf(current), 1);

        //makes the path
        if (current == end) {
            delay((searching_delay + 500)).then(() => {
                generate_best_path(parent, end, 500)
                create_best_path_visual();
                end.set_as_end()
                end.update()
            });
            return true
        }

        for (const neighbor of current.neighbors) {

            let temp_g_score = g_score.get(current) + 1

            if (temp_g_score < g_score.get(neighbor)) {
                parent.set(neighbor, current);
                g_score.set(neighbor, temp_g_score);
                f_score.set(neighbor, temp_g_score + calculate_h_value(neighbor.get_pos(), end.get_pos()));
                if (!(neighbor in open_set_hash)) {
                    count += 1
                    open_set.add([f_score.get(neighbor), count, neighbor])
                    open_set_hash.push(neighbor)
                    // neighbor.set_as_to_search()
                    neighbor.set_color(SEARCHED_1);
                    delay(searching_delay).then(() => {
                        neighbor.update()
                        delay(160).then(() => {
                            neighbor.set_as_to_search();
                            neighbor.update()
                        });

                    });
                }
            }
        }

        if (current != start) {

            delay(searching_delay).then(() => {
                let timer = 0
                SEARCHES.forEach(color => {
                    delay(timer).then(() => {
                        current.set_color(color)
                        current.update()
                    })
                    timer += 150;
                })
            })
        }
    }

    delay(searching_delay).then(() => {
        repeatMaze();
    })

    return false
}


/**
 * Resets / Clears the grid
 */
function reset_grid() {
    END_PATH = [];
    if (!STARTED) {
        start_node = null;
        end_node = null;
        let count = 0;
        for (let i = 0; i < GRID.length; i++) {
            for (let k = 0; k < GRID[i].length; k += 5) {

                delay(count).then(() => {
                    for (let j = k; j < k + 5; j++) {
                        let node = GRID[i][j]
                        if (node != null && !node.isEmpty()) {
                            node.maze_reset();
                        }
                    }
                })
                count += 1;
            }
        }
        GRID.forEach(row => {
            row.forEach(node => {

            });
        });
    }
}



/**
 * Start the pathfinder program as a whole
 * Updates the neighbors to detect if wall
 */
function start_pathfinder() {
    if (!STARTED) {
        if (start_node != null && end_node != null) {
            STARTED = true;
            GRID.forEach(row => {
                row.forEach(node => {
                    node.update_neighbors(GRID)
                });
            });
            if (!algorithm(GRID, start_node, end_node)) {
                STARTED = false;
            }
        }
    }
}