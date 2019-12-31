import {message} from 'antd';
import FindPath from './AStarAlgorithm';

export default (canvas, Cplay)=>{
    if(Cplay.loop === true)return;
    Cplay.loop = true;
    const ctx = canvas.getContext('2d');
    
    let snake = [22,21, 20], direction =1, food = 150, n;
    const Speed = 50;
    const draw = (seat, color) => {
        ctx.fillStyle = color;
        ctx.fillRect(seat % 20*20 + 1, ~~(seat /20) * 20 + 1, 18, 18);
    }
    const drawScore = () => {
        ctx.clearRect(400,0, 200, 400);
        ctx.font = '32px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('長度: ' + snake.length, 424, 72);
    }
    const drawEye = () => {
        ctx.fillStyle = 'blue';
        if(direction === 1){
            ctx.fillRect(snake[0] % 20*20 + 1 + 11, ~~(snake[0] /20) * 20 + 1 +3, 5, 5);
            ctx.fillRect(snake[0] % 20*20 + 1 + 11, ~~(snake[0] /20) * 20 + 1 + 11, 5, 5);
        }else if(direction === -1){
            ctx.fillRect(snake[0] % 20*20 + 1 + 4, ~~(snake[0] /20) * 20 + 1 + 3, 5, 5);
            ctx.fillRect(snake[0] % 20*20 + 1 + 4, ~~(snake[0] /20) * 20 + 1 + 11, 5, 5);
        }else if(direction === -20){
            ctx.fillRect(snake[0] % 20*20 + 1 + 3, ~~(snake[0] /20) * 20 + 1 + 4, 5, 5);
            ctx.fillRect(snake[0] % 20*20 + 1 + 11, ~~(snake[0] /20) * 20 + 1 + 4, 5, 5);
        }else if(direction === 20){
            ctx.fillRect(snake[0] % 20*20 + 1 + 3, ~~(snake[0] /20) * 20 + 1 + 11, 5, 5);
            ctx.fillRect(snake[0] % 20*20 + 1 + 11, ~~(snake[0] /20) * 20 + 1 + 11, 5, 5);
        }
        
    };
    const moveFakeSnake = (path, last) => {
        const fakeSnake = [...snake];
        fakeSnake.push(last);
        for(let i = path.length - 1; i >= 0; i--){
            if(i !== 0)fakeSnake.pop();
            fakeSnake.unshift(path[i]);
        }
        return fakeSnake;
    };
    
    
    const getACellThatIsFarthestToGoal = (last) => {
        const d = [-1,20,1,-20];
        let mostFarthest = -1;
        let mostFarthestValue = -1;
        for(let i = 0; i < 4; i++){
            let fakeSnake = [...snake];
            
            let next = fakeSnake[0] + d[i];
            if(fakeSnake.indexOf(next) !== -1 || (fakeSnake[0] % 20 === 0 && d[i] === -1) || (fakeSnake[0]%20 === 19 && d[i] === 1) || next < 0 || next >399)continue;
            
            fakeSnake.unshift(next);
            let cost;
            if(cost = FindPath(fakeSnake[0], fakeSnake[fakeSnake.length -1], fakeSnake, true).length !== 0){
                if (cost > mostFarthestValue){ mostFarthestValue = cost; mostFarthest = next;}
            }
        }
        if (mostFarthest !== -1)return mostFarthest;
        for(let i = 0; i < 4; i++){
            let fakeSnake = [...snake];
            let next = fakeSnake[0] + d[i];
            if(fakeSnake.indexOf(next) !== -1 || (fakeSnake[0] % 20 === 0 && d[i] === -1) || (fakeSnake[0]%20 === 19 && d[i] === 1)|| next < 0 || next >399)continue;
            return  next;
        }
        return [-1,20,1,20][Math.floor(Math.random()*4)] + snake[0];

    }
    const drawTail = () => {
        const snakeTail = snake[snake.length - 1];
        const tail_direction = snake[snake.length - 2]- snakeTail;
        ctx.fillStyle = 'black';
        ctx.fillRect(snakeTail % 20*20 + 1, ~~(snakeTail /20) * 20 + 1, 18, 18);
        ctx.fillStyle = 'lime';
        ctx.beginPath();
        if(tail_direction === -20){
            ctx.moveTo(snakeTail % 20*20 + 1, ~~(snakeTail /20) * 20 + 1);
            ctx.lineTo(snakeTail % 20*20 + 1 + 9, ~~(snakeTail /20) * 20 + 1 + 18);
            ctx.lineTo(snakeTail % 20*20 + 1 + 18, ~~(snakeTail /20) * 20 + 1);
            ctx.fill();
        }else if(tail_direction === 20){
            ctx.moveTo(snakeTail % 20*20 + 1 , ~~(snakeTail /20) * 20 + 1 + 18);
            ctx.lineTo(snakeTail % 20*20 + 1 + 9, ~~(snakeTail /20) * 20 + 1);
            ctx.lineTo(snakeTail % 20*20 + 1 + 18, ~~(snakeTail /20) * 20 + 1 + 18);
            ctx.fill();
        }else if(tail_direction === -1){
            ctx.moveTo(snakeTail % 20*20 + 1, ~~(snakeTail /20) * 20 + 1);
            ctx.lineTo(snakeTail % 20*20 + 1 + 18, ~~(snakeTail /20) * 20 + 1 + 9);
            ctx.lineTo(snakeTail % 20*20 + 1 , ~~(snakeTail /20) * 20 + 1 + 18);
            ctx.fill();
        }else if(tail_direction === 1){
            ctx.moveTo(snakeTail % 20*20 + 1 + 18, ~~(snakeTail /20) * 20 + 1);
            ctx.lineTo(snakeTail % 20*20 + 1 , ~~(snakeTail /20) * 20 + 1 + 9);
            ctx.lineTo(snakeTail % 20*20 + 1 + 18, ~~(snakeTail /20) * 20 + 18);
            ctx.fill();
        }
        
    }
    const loop = () => {
        //A* Algorithm
        if(Cplay.loop === false)return;
        let nextstep = -999;
        let last = snake.pop();
        const Path = FindPath(snake[0], food, snake);
        
        draw(last, 'black');
        let FindTail;
        if(Path.length !== 0){
            const fakeSnake = moveFakeSnake(Path, last);
            FindTail = FindPath(fakeSnake[0], fakeSnake[fakeSnake.length -1], fakeSnake, true);
            if(FindTail.length !== 0){
                nextstep = Path[Path.length-1];
            }
        }
        if(Path.length === 0 || FindTail.length < 2 ){
            nextstep = getACellThatIsFarthestToGoal(last);
        }
        direction = nextstep - snake[0];
        
        snake.unshift(n = nextstep);
        draw(n, "lime");
        drawEye();
        draw(snake[1], "lime");
        drawTail();
        if(snake.indexOf(n, 1) > 0 || n < 0 || n > 399 || (direction ===1 && n %20 === 0) || (direction === -1 && n%20 === 19)){
            clearInterval(Interval);
            if(snake.length < 400){console.log(snake);message.warning("GAME OVER!!!");}
            else {message.success("You Win!!!!!!!!!!");}
            Cplay.loop = false;
            return;
        }
        if(n === food){

            if(snake.length < 400){draw(snake[snake.length -1], "lime");snake.push(last);}
            
            drawScore();
            if(snake.length > 399){message.success("You Win!!!!!!!!!!");Cplay.loop = false;clearInterval(Interval);return;}
            while(snake.indexOf(food = ~~(Math.random() * 400)) > 0);
            draw(food, 'yellow');
        }
    }
    for(let i = 0; i < 400; i++){
        draw(i, 'black');
    }
    draw(food, 'yellow');
    snake.forEach(e=>{draw(e, 'lime');});
    drawScore();
    loop();
    const Interval = setInterval(loop, Speed);
}