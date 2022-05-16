function Navbar({ setter }) {
    return ( <
        div className = "flex text-4xl items-center justify-between flex-row bg-gray-800 w-full h-16 p-5" >
        <
        h1 className = "font-sans text-white font-bold" >
        <
        span className = "text-red-500" > i < /span>MAZE <
        /h1>

        <
        div className = "bg-gray-800 border-2 border-white text-lg text-white p-2 rounded-md" >
        <
        span > Algo: < /span> <
        select className = "bg-gray-800 border-none outline-none"
        name = "algoSelector"
        id = "selector"
        onChange = {
            (e) => {
                setter(e.target.value);
            }
        } >
        <
        option value = "0" > Breadth First Search < /option> { /* <option value="1">DFBB</option> */ } <
        option value = "2" > Dijkstra & apos; s Algorithm < /option> <
        option value = "3" > A * < /option> <
        option value = "4" > Greedy Best First Search < /option> <
        option value = "5" > DFS < /option> { /* <option value="6">IDS</option> */ } <
        /select> <
        /div> <
        /div>
    );
}

export default Navbar;