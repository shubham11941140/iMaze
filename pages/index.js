import { useState, useEffect } from "react";
import ConfigComponent from "../components/ConfigComponent";
import Navbar from "../components/Navbar";
import Dijkstra from "../components/Dijkstra";
import Bfs from "../components/Bfs";
import Astar from "../components/Astar";
import Dfbb from "../components/Dfbb";
import RotateLoader from "react-spinners/SyncLoader";
import Head from "next/head";
import GreedyBfs from "../components/GreedyBfs";
import Dfs from "../components/Dfs";
import Ids from "../components/Ids";

export const START_NODE_ROW = 0;
export const START_NODE_COL = 0;
export const FINISH_NODE_ROW = 20;
export const FINISH_NODE_COL = 45;

export default function Home() {
    const [algo, setAlgo] = useState(0);
    const [loading, setLoading] = useState(false);
    const [grid, setGrid] = useState(
        getInitialGrid(FINISH_NODE_ROW + 1, FINISH_NODE_COL + 1)
    );

    const mazeSetter = (newGrid) => setGrid(newGrid);

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    return (
        // Root element
        <
        div className = "flex w-full h-full flex-col items-center justify-center" >
        <
        Head >
        <
        title > iMaze - AI Path Finding Algorithms Visualizer < /title> < /
        Head > {
            loading ? ( <
                div className = "flex w-full h-[800px] flex-col items-center justify-center bg-black" >
                <
                h1 className = "font-sans text-white mb-8 text-8xl font-bold" >
                <
                span className = "text-red-500" > i < /span>MAZE < /
                h1 > <
                p className = "text-white mb-10" > Made with❤️ at IIT Bhilai < /p> <
                RotateLoader color = { "#e74c3c" }
                loading = { loading }
                size = { 20 }
                margin = { 20 }
                /> < /
                div >
            ) : (
                /* Navbar component */
                <
                >
                <
                Navbar setter = { setAlgo }
                />

                <
                div className = "flex flex-row p-4 w-full h-full" > {
                    algo == "2" && ( <
                        div className = "flex-1 flex items-center justify-center" >
                        <
                        Dijkstra grid = { grid }
                        mazeSetter = { mazeSetter }
                        /> < /
                        div >
                    )
                } {
                    algo == "1" && ( <
                        div className = "flex-1 flex items-center justify-center" >
                        <
                        Dfbb grid = { grid }
                        mazeSetter = { mazeSetter }
                        /> < /
                        div >
                    )
                } {
                    algo == "0" && ( <
                        div className = "flex-1 flex items-center justify-center" >
                        <
                        Bfs grid = { grid }
                        mazeSetter = { mazeSetter }
                        /> < /
                        div >
                    )
                } {
                    algo == "3" && ( <
                        div className = "flex-1 flex items-center justify-center" >
                        <
                        Astar grid = { grid }
                        mazeSetter = { mazeSetter }
                        /> < /
                        div >
                    )
                } {
                    algo == "4" && ( <
                        div className = "flex-1 flex items-center justify-center" >
                        <
                        GreedyBfs grid = { grid }
                        mazeSetter = { mazeSetter }
                        /> < /
                        div >
                    )
                } {
                    algo == "5" && ( <
                        div className = "flex-1 flex items-center justify-center" >
                        <
                        Dfs grid = { grid }
                        mazeSetter = { mazeSetter }
                        /> < /
                        div >
                    )
                } {
                    algo == "6" && ( <
                        div className = "flex-1 flex items-center justify-center" >
                        <
                        Ids grid = { grid }
                        mazeSetter = { mazeSetter }
                        /> < /
                        div >
                    )
                } { /* <ConfigComponent /> */ } <
                /div> < / >
            )
        } <
        /div>
    );
}

const getInitialGrid = (rowLen, colLen) => {

    const grid = [];

    for (let row = 0; row < rowLen; row++) {

        const currentRow = [];

        for (let col = 0; col < colLen; col++) {
            currentRow.push(createNode(col, row, 0));
        }

        grid.push(currentRow);

    }
    return grid;
};

const createNode = (col, row, isWall) => {

    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: isWall,
        previousNode: null,
    };

};