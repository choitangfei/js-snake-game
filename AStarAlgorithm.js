const calCost = (Node1, Node2) => {
    if(Node1 === Node2) return 0;
    return Math.abs(~~(Node1/20) - ~~(Node2/20)) + Math.abs(~~(Node1%20) - ~~(Node2%20));
}


export default (start, target, snake, fake = false) => {
    const grid = new Array(400);
    for(let i = 0; i < grid.length; i++){grid[i] = {f:9999, g: 9999, h:9999, parent: 9999};}
    const openList = [];
    const closeList = [];
    openList.push(start);
    grid[start] = {g:0, h:calCost(target, start), parent: -1};
    grid[start].f = grid[start].h;
    
    
    while (openList.indexOf(target) === -1 && openList.length !== 0) {
        openList.sort((a,b)=>(grid[a].f - grid[b].f));
        let currentGrid = openList[0];
        const candidateGrid = openList.filter(e=> grid[e].f === grid[currentGrid].f);
        currentGrid = candidateGrid[Math.floor(Math.random()*candidateGrid.length)];
        
        closeList.push(currentGrid);
        openList.splice(openList.indexOf(currentGrid),1);
        
        let NearBox = [-1, -20, 1, 20].map((e) => {return (currentGrid + e)}).filter(e => e >= 0 && e <400);
        let NearBoxValid = NearBox.filter(e => {
            if (closeList.indexOf(e) !== -1) return false;
            if (!fake && snake.indexOf(e) !== -1)return false;
            if (fake && snake.slice(0,-1).indexOf(e) !== -1)return false;
            if (currentGrid % 20 === 0 && e % 20 === 19){return false;}
            if (currentGrid %20 === 19 && e % 20 === 0){return false;}
            return true;
        });
        NearBoxValid.forEach((t) => {
            if(openList.indexOf(t) === -1){
                openList.push(t);
                grid[t] = {parent: currentGrid, g: calCost(currentGrid,t) + grid[currentGrid].g, h: calCost(target,t)};
                grid[t].f = grid[t].g + grid[t].h;
            }else{
                if(grid[currentGrid].g > grid[t].g){
                    grid[currentGrid] = {parent: t, g: calCost(currentGrid, t) + grid[t].g, h: calCost(target, currentGrid)}
                    grid[currentGrid].f = grid[currentGrid].g + grid[currentGrid].h;
                }
            }
        });
        
        
    }
    let result = [];
    
    if(grid[target].parent !== 9999){
        let current = target;
        while(current !== start){
            result.push(current);
            current = grid[current].parent;
        }
    }
    //if (result.length === 0){console.log("CloseList: " + closeList);console.log("OpenList: " + openList);console.log("Snake: "+ snake);}
    return result;
}