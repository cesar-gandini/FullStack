let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let box = 32;
let snake = [
    { x: 8 * box, y: 8 * box },
    { x: 9 * box, y: 8 * box }
  ];
  let direction = "right";
  const food = {
    x: Math.floor(Math.random() * 15 + 1) * box, 
    y: Math.floor(Math.random() * 15 + 1) * box 
  };

  function createBG(){
    context.fillStyle = "black";
    context.fillRect(0, 0, 16 * box, 16 * box);
  }
  function createSnake() {
    for (let i = 0; i < snake.length; i++) {
      context.fillStyle = i === 0 ? "green" : "lightgreen";
      context.fillRect(snake[i].x, snake[i].y, box, box);
      context.strokeStyle = "white";
      context.strokeRect(snake[i].x, snake[i].y, box, box);
    }
  }
  function createFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
    context.strokeStyle = "white";
    context.strokeRect(food.x, food.y, box, box); 
  }
  function update(event) {
   switch (event.keyCode) {
      case 37: // Seta p/ esquerda
        if (direction !== "right") {
          direction = "left";
        }
        break;
      case 38: // Seta p/ cima
        if (direction !== "down") {
          direction = "up";
        }
        break;
      case 39: // Seta p/ direita
        if (direction !== "left") {
          direction = "right";
        }
        break;
      case 40: // Seta p/ baixo
        if (direction !== "up") {
          direction = "down";
        }
        break;
    }
  }
  function startGame(){
      
      let game = setInterval(() => {
      let snakeX = snake[0].x;
      let snakeY = snake[0].y;  
      
      document.addEventListener("keydown", update);
      
      if (direction === "right") snakeX += box;
      if (direction === "left") snakeX -= box;
      if (direction === "up") snakeY -= box;
      if (direction === "down") snakeY += box;

      if (snakeX > 15 * box) snakeX = 0;
      if (snakeX < 0) snakeX = 15 * box;
      if (snakeY > 15 * box) snakeY = 0;
      if (snakeY < 0) snakeY = 15 * box;
          // VALIDAÇÃO DA COLISÃO DA SNAKE
      for (var i = 1; i < snake.length; i++){
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
        clearInterval(game);
        alert("GAME OVER!");  
        }
        }
        // VALIDAÇÃO SE A SNAKE ENCOSTOU NO FOOD
        if (snakeX === food.x && snakeY === food.y) {
            do {
                food.x = Math.floor(Math.random() * 13 + 3) * box; // GERA UM FOOD NOVO EM UM LUGAR ALEATÓRIO
                food.y = Math.floor(Math.random() * 13 + 3) * box;
              } while (snake.some(segment => segment.x === food.x && segment.y === food.y)); // CERTIFICA QUE A FOOD NÃO VAI ESTAR NO LUGAR DA SNAKE
              
              const newHead = { x: snakeX, y: snakeY };
              snake.unshift(newHead);  //CRIA UMA NVOA PEÇA NO LOCAL DA CABEÇA
              
            } else {
                const newHead = { x: snakeX, y: snakeY };
            snake.unshift(newHead);
                snake.pop();                     // TIRA UMA PEÇA
            }
           // ATUALIZAR A snake[0]
          snake[0] = { x: snakeX, y: snakeY };
        createBG();
        createSnake();
        createFood();
    }
, 100); // Velocidade do SetInterval
  }
startGame()