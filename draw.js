import {message} from 'antd';
export default (canvas, Cplay)=>{
    if(Cplay.loop === true)return;
    Cplay.loop = true;
    const ctx = canvas.getContext('2d');
    
    let snake = [21, 20], direction =1, food = 43, n;
    const draw = (seat, color) => {ctx.fillStyle = color;ctx.fillRect(seat % 20*20 + 1, ~~(seat /20) * 20 + 1, 18, 18);}
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
    document.onkeydown = (e) => {direction = snake[1] - snake[0] == (n = [-1, -20, 1, 20][e.keyCode - 37] || direction) ? direction : n;};
    const loop = () => {
        if(Cplay.loop === false)return;
        let last = snake.pop();
        draw(last, 'black');
        snake.unshift(n = snake[0] + direction);
        if(snake.indexOf(n, 1) > 0 || n < 0 || n > 399 || direction ===1 && n%20 === 0 || direction === -1 && n%20 === 19){
            snake.shift();
            snake.push(last);
            draw(snake[1], "lime");
            draw(snake[snake.length-2], "lime");
            drawEye();
            drawTail();
            clearInterval(Interval);
            message.warning("GAME OVER!!!");
            Cplay.loop = false;
            return;
        }
        draw(n, "lime");
        drawEye();
        draw(snake[1], "lime");
        drawTail();
        if(n === food){
            if(snake.length < 400){draw(snake[snake.length -1], "lime");snake.push(last);}
            drawScore();
            if(snake.length > 399){message.success("You Win!!!!!!!!!!");Cplay.loop = false;clearInterval(Interval);return;}
            while(snake.indexOf(food = ~~(Math.random() * 400)) > 0);
            draw(food, 'yellow');
        }
    }
    for(let i = 0; i < 400; i++)draw(i, 'black');
    drawScore();
    draw(food, 'yellow');
    const Interval = setInterval(loop, 50);
}