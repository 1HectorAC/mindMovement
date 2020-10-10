//Manage the state of the game.
const GAMESTATE = {
    DIRECTIONS: 0,
    PLAY: 1,
    GAMEOVER: 2
};
var currentState = GAMESTATE.DIRECTIONS;

$("form").submit(function (event) {
    console.log("Submited content");
    //Check if game is in state of displaying directions.
    if(currentState == GAMESTATE.DIRECTIONS){
        console.log("Entered Direction");
        $(".MainContent").empty();
        $(".MainContent").append("<p>Add color display here.</p>");
        $(".MainContent").append("<p>Up: red<br>down: blue<br>down:green<br>right: yellow</p>");

        $(".MainContent").append("<input type='submit' value='Next'>");
        currentState = GAMESTATE.PLAY;
    }
    //Check if game is in state of playing.
    else if(currentState = GAMESTATE.PLAY){
        console.log("Entered Play");
        $(".MainContent").empty();
        $(".MainContent").append("<p>Playing.</p>");
    }
    else{
        //$(".MainContent").empty();
    }

    event.preventDefault();
});