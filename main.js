window.addEventListener("DOMContentLoaded", () => {
  const choices = document.querySelectorAll(".choice"),
    score = document.querySelector("#score"),
    modal = document.querySelector(".modal"),
    result = document.querySelector("#result"),
    restart = document.querySelector("#restart"),
    scoreBoard = {
      player: 0,
      computer: 0,
    };

  // Play game
  function play(event) {
    restart.style.display = "inline-block";
    const playerChoice = event.target.id;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    showWinner(winner, computerChoice);
  }

  // GetComputerChoice
  function getComputerChoice() {
    const rand = Math.random();
    if (rand < 0.35) {
      return "rock";
    } else if (rand <= 0.67) {
      return "paper";
    } else {
      return "scissors";
    }
  }

  // GetWinner
  function getWinner(player, computer) {
    if (player === computer) {
      return "draw";
    } else if (player === "rock") {
      if (computer === "paper") {
        return "computer";
      } else {
        return "player";
      }
    } else if (player === "paper") {
      if (computer === "scissors") {
        return "computer";
      } else {
        return "player";
      }
    } else if (player === "scissors") {
      if (computer === "rock") {
        return "computer";
      } else {
        return "player";
      }
    }
  }

  // ShowWinner
  function showWinner(winner, computerChoice) {
    if (winner === "player") {
      scoreBoard.player++;
      result.innerHTML = `
        <h1 class='text-win'>You Win</h1>
        <i class='fas fa-hand-${computerChoice} fa-10x'></i>
        <p>Computer Choice <strong>${
          computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
        }</strong> </p>
      `;
    } else if (winner === "computer") {
      scoreBoard.computer++;
      result.innerHTML = `
         <h1 class="text-lose">You lose</h1>
         <i class='fas fa-hand-${computerChoice} fa-10x'></i>
         <p>Computer Choice <strong> ${
           computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
         }</strong></p>
      `;
    } else {
      //   scoreBoard.draw++;
      result.innerHTML = `
          <h1>It's A Draw</h1>
          <i class="fas fa-hand-${computerChoice}"></i>
          <p>Computer Choice <strong>${
            computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
          }</strong></p>
        `;
    }

    score.innerHTML = `
       <p>${scoreBoard.player}</p>
       <p>${scoreBoard.computer}</p>
    `;

    modal.style.display = "block";
  }

  // Restart Game
  function restartGame() {
    scoreBoard.player = 0;
    scoreBoard.computer = 0;
    score.innerHTML = `
      <p>${scoreBoard.player}</p>
      <p>${scoreBoard.computer}</p>
      `;
  }

  // ClearModal
  const clearModal = (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  };

  // Event Listenears
  choices.forEach((choice) => choice.addEventListener("click", play));

  window.addEventListener("click", clearModal);

  restart.addEventListener("click", restartGame);
});
