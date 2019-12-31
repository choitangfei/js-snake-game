import React from 'react'
import draw from './draw'
import drawAi from './drawAi';
import {Button, Col} from 'antd';

class SnakeGame extends React.Component{
    constructor(props){
        super(props);
        this.Canvas = React.createRef();
        this.play = {loop: false};
    }

    Play(){
        draw(this.Canvas.current, this.play);
    }
    PlayAI(){
        drawAi(this.Canvas.current, this.play);
    }
    componentDidMount(){
    }

    render(){
        return (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: "#d9f7be", width: "100%", height: "100vh", margin:'auto'}}>

                    <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Button shape="round" onClick={this.Play.bind(this)}>開始遊戲</Button>
                    <Button style={{fontSize: 10}} type="danger" shape="round" onClick={this.PlayAI.bind(this)}>開啟作弊模式<br />（注意！開啟後你將永遠失去玩貪吃蛇的樂趣）</Button>
                    </div>
                    <div>
                        <canvas id="snake-game" ref={this.Canvas} width={600} height={400} style={{border: '1px solid black'}}></canvas>
                    </div>
                    
                
                
            </div>
        );
    }
}

export default SnakeGame;