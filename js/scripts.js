var counter = Math.floor(Math.random() * 7);
function Player(name) {
  this.name = name;
  this.currently = 0;
  this.total = 0;
  this.die1 = [1,2,3,4,5,6];
  this.dieRoll = 0;
}

Player.prototype.roll = function() {
  this.dieRoll= this.die1[Math.floor(Math.random()*this.die1.length)];
  if(this.dieRoll === 1) {
    this.currently = 0;
    counter++;
  }
  else {
    this.currently += this.dieRoll;
  }
}

Player.prototype.hold = function() {
  this.total += this.currently;
  this.currently = 0;
}

$(function() {
  function playerTurn(turnPlayer, otherPlayer) {
    $("#" + otherPlayer + "Turn").text("");
    $("#" + turnPlayer + "Turn").html("<h1>Your Turn</h1>");
    $("." + otherPlayer + " img").removeClass("animated zoomIn");
    $("." + otherPlayer + " img").addClass("desaturate");
    $("." + turnPlayer + " img").addClass("animated zoomIn");
    $("." + turnPlayer + " img").removeClass("desaturate");
  }
  function winner(winPlayer) {
    $("#gameScreen").slideUp();
    $("#" + winPlayer + "Win").show()
  }
  function compRoll(player, otherPlayer, turnPlayer) {
    (setTimeout(function() {
      player.dieRoll= player.die1[Math.floor(Math.random()*player.die1.length)];
      if(player.currently < 15 && player.dieRoll !== 1) {
        player.currently += player.dieRoll;
        $(".dieValue").text(player.dieRoll);
        $("#player1Currently").text(player.currently);
        compRoll(player, otherPlayer, turnPlayer);
        if(player.total + player.currently >= 20) {
          winner(turnPlayer);
        }
      }
      else if(player.dieRoll === 1) {
        player.currently = 0;
        counter++;
        $(".dieValue").text(player.dieRoll);
        $("#player1Currently").text(player.currently);
        playerTurn(otherPlayer,turnPlayer);
      }
      else {
        player.currently += player.dieRoll;
        player.total += player.currently;
        if(player.total >= 20) {
          winner(turnPlayer);
        }
        player.currently = 0;
        counter++;
        $(".dieValue").text(player.dieRoll);
        $("#player1Currently").text(player.currently);
        $("#player1Total").text(player.total);
        playerTurn(otherPlayer,turnPlayer);
      }
    }, 1000));
  }

  $("form").submit(function(event) {
    event.preventDefault();
    var name0 = $("#name0").val();
    var name1 = $("#name1").val();
    var player0 = new Player(name0);
    var player1 = new Player(name1);
    $("#gameScreen").fadeIn(1000);
    $("#startScreen").slideUp();
    $("#grass").hide();
    if (player0.name === "" || player1.name === ""){
      if(name0 === "") {
        var player0 = new Player(name1);
      }
      else {
        var player0 = new Player(name0);
      }
      var player1 = new Player("Computer");
      $(".player0Name").text(player0.name);
      $(".player1Name").text(player1.name);
      counter = 0;
      playerTurn("player0", "player1");

      $("#rollButton").click(function(){
        $("#rollButton").toggleClass("animated shake");
        if(counter % 2 === 0) {
          player0.roll();
          $(".dieValue").text(player0.dieRoll);
          $("#player0Currently").text(player0.currently);
          if (player0.dieRoll === 1) {
            playerTurn("player1", "player0");
            compRoll(player1, "player0", "player1");
          }
          if(player0.total + player0.currently >= 100) {
            winner("player0");
          }
        }
      });
      $("#holdButton").click(function() {
        player0.hold();
        $("#player0Currently").text(player0.currently);
        $("#player0Total").text(player0.total);
        playerTurn("player1", "player0");
        compRoll(player1, "player0", "player1");
        if(player0.total >= 100) {
          winner("player0");
        }
        counter++;
      });
    }
    else {
      $(".player0Name").text(player0.name);
      $(".player1Name").text(player1.name);
      if(counter % 2 === 0) {
        playerTurn("player0", "player1");
      }
      else {
        playerTurn("player1", "player0");
      }
      $("#rollButton").click(function(){
        $("#rollButton").toggleClass("animated shake");
        if(counter % 2 === 0) {
          player0.roll();
          $(".dieValue").text(player0.dieRoll);
          $("#player0Currently").text(player0.currently);
          if (player0.dieRoll === 1) {
            playerTurn("player1", "player0");
          }
          if(player0.total + player0.currently >= 100) {
            winner("player0");
          }
        }
        else {
          player1.roll();
          $(".dieValue").text(player1.dieRoll);
          $("#player1Currently").text(player1.currently);
          if (player1.dieRoll === 1) {
            playerTurn("player0", "player1");
          }
          if(player1.total + player1.currently >= 100) {
            winner("player1");
          }
        }
      });
      $("#holdButton").click(function() {
        if(counter % 2 === 0) {
          player0.hold();
          $("#player0Currently").text(player0.currently);
          $("#player0Total").text(player0.total);
          playerTurn("player1", "player0");
          if(player0.total >= 100) {
            winner("player0");
          }
        }
        else {
          player1.hold();
          $("#player1Currently").text(player1.currently);
          $("#player1Total").text(player1.total);
          playerTurn("player0", "player1");
          if(player1.total >= 100) {
            winner("player1");
          }
        }
        counter++;
      });
    }
  });
  $(".playAgain").click(function() {
    document.location.reload(true);
  });
});
