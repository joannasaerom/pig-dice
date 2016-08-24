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
var counter = 0;
$(function() {
  $("form").submit(function(event) {
    event.preventDefault();
    var name0 = $("#name0").val();
    var name1 = $("#name1").val();
    var player0 = new Player(name0);
    var player1 = new Player(name1);
    $("#gameScreen").fadeIn(1000);
    $(".player0Name").text(player0.name);
    $(".player1Name").text(player1.name);

    $("#rollButton").click(function(){
      if(counter % 2 === 0) {
        player0.roll();
        $(".dieValue").text(player0.dieRoll);
        $("#player0Currently").text(player0.currently);
        if(player0.total + player0.currently >= 100) {
          $("#gameScreen").slideUp();
          $("#player0Win").show()
        }
      }
      else {
        player1.roll();
        $(".dieValue").text(player1.dieRoll);
        $("#player1Currently").text(player1.currently);
        if(player1.total + player1.currently >= 100) {
          $("#gameScreen").slideUp();
          $("#player1Win").show()
        }
      }
    });
    $("#holdButton").click(function() {
      if(counter % 2 === 0) {
        player0.hold();
        $("#player0Currently").text(player0.currently);
        $("#player0Total").text(player0.total);
        if(player0.total >= 100) {
          $("#gameScreen").slideUp();
          $("#player0Win").show()
        }
      }
      else {
        player1.hold();
        $("#player1Currently").text(player1.currently);
        $("#player1Total").text(player1.total);
        if(player1.total >= 100) {
          $("#gameScreen").slideUp();
          $("#player1Win").show()
        }
      }
      counter++;
    });
  });
});
