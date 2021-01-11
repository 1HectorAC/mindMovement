// Manage operation parts need for setting up the option. (element id, checkbox value, element label).
const OPERATION_LIST = [
    ["add", "+", "Addition (+)"],
    ["minus","-"," Subtraction (-)"],
    ["times","*","Multiplication (*)"]
];

// The options for how many questions a game can have.
const QuestionAmountOptions = [5, 10, 15];

// Number of Questions in game.
var numberOfQuestions = 0;

var selectedOperation;

// Max number possible for equation question.
var MaxNumberOption = 9;

// List containing answers to all questions in a game.
var answerList = [];

var currentTime = 0;
var timer;

SetupDirectionsContent($('#mainContent'));

$("body").on('click', 'button', function(ev) {
    ev.preventDefault()
    if ($(this).attr("value") == "Play") {
        //Setup setting variables.
        numberOfQuestions = parseInt($('#num').val());
        selectedOperation = $("input[name='operation']:checked").val();

        $('#mainContent').empty();

        // Setup some variables with initial value.
        answerList = [];
        currentTime = 0;

        // Add on screen game items.
        SetupGameContent($('#mainContent'), numberOfQuestions, selectedOperation);

        // Add game timer.
        timer = setInterval(IncrementTime,1000);

    }
    else if ($(this).attr("value") == "Results") {
        // List of entries by player.
        var entryList = $('.entryFieldClass');
        
        // Check if any value in List is empty and give warning if so.
        if(ContainsEmptyString(entryList)){
            $('#error').text("You forgot to answer some equations.");
        }
        else{
            $('#error').remove();
            
            // Remove Submit answers button.
            $('#submitAnswer').remove();

            clearInterval(timer);

            // Make answer textbox unchangable.
            entryList.prop('disabled', true);

            // Add correct statements to equations
            AddCorrectStatements(entryList);

            // Calculate Results and display.
            $('#mainContent').append('<h2>Total Correct: '+GetAnswerTotal(entryList)+' / '+ numberOfQuestions +'</h2>');
            $('#mainContent').append('<h2>Time: '+currentTime+' Seconds.</h2>');

            $('#mainContent').append('<button class="btn btn-primary customButton" type="submit" value="Retry">Retry</button>');
            $('#mainContent').append('<button class="btn btn-primary customButton" type="submit" value="Directions">Directions</button>');
            
        }
    }
    else if ($(this).attr("value") == "Retry") {
        $('#mainContent').empty();

        // Setup some variables with initial value.
        answerList = [];
        currentTime = 0;

        // Add on screen game items.
        SetupGameContent($('#mainContent'), numberOfQuestions, selectedOperation);

        //Add game timer.
        timer = setInterval(IncrementTime,1000);

    }
    else if ($(this).attr("value") == "Directions") {
        $('#mainContent').empty();
        SetupDirectionsContent($('#mainContent'));
    }
});

// Setup on screen items for directions.
function SetupDirectionsContent(element){

    var leftSide = $('<div class="jumbotron" style="background-color:#1b4ffa;color:white"></div>');
    var rightSide = $('<div class="jumbotron" style="background-color:white;color:#1b4ffa"></div>');

    // Setup directions display.
    leftSide.append('<h4>-Description-</h4>');
    leftSide.append("<hr class='whiteLine'>");
    leftSide.append('<p>Practice math operations with a bunch of simple math problems to solve. Just set the settings you want and remember that you will be timed so move fast.</p>');

    // Setup setting display.
    rightSide.append('<h4>-Settings-</h4>');
    rightSide.append("<hr class='blueLine'>");

    // Setup operation checkbox options.
    rightSide.append('<h5>-Operation-</h5>');
    // Add 'checked' for first checkbox option.
    rightSide.append('<input type="radio" id="'+OPERATION_LIST[0][0]+'" name="operation" value="'+OPERATION_LIST[0][1]+'" checked>');
    rightSide.append('<label for="'+OPERATION_LIST[0][0]+'">'+OPERATION_LIST[0][2]+'</label><br>');
    for(i = 1; i < OPERATION_LIST.length; i++){
        rightSide.append('<input type="radio" id="'+OPERATION_LIST[i][0]+'" name="operation" value="'+OPERATION_LIST[i][1]+'">');
        rightSide.append('<label for="'+OPERATION_LIST[i][0]+'">'+OPERATION_LIST[i][2]+'</label><br>');
    }
    rightSide.append('<hr>');

    // Setup dropdown part.
    rightSide.append('<h5>-Number of Questions-</h5>');
    var selectSection = $('<select id="num" class="btn btn-secondary"></select>');
    for(i = 0; i < QuestionAmountOptions.length; i++){
        selectSection.append('<option value="'+QuestionAmountOptions[i]+'">'+QuestionAmountOptions[i]+' Questions</option>');
    }
    rightSide.append(selectSection);
    rightSide.append('<hr>');

    rightSide.append('<button type="submit" value="Play" class="btn btn-primary customButton">Play</button>');

    var row = $('<div class="row" id="directionItems"></div');
    row.append($('<div class="col-md-6"></div>').append('<div class="container"></div>').append(leftSide));
    row.append($('<div class="col-md-6"></div>').append('<div class="container"></div>').append(rightSide));
    element.append(row);
}

// Setup on screen items for game.
function SetupGameContent(element, questions, operation){
    var gameItems = $("<div id='gameItems'></div>");

    // Add equations.
    for (var i = 0; i < questions; i++) {
        AddEquation(operation, gameItems);
    }

    gameItems.append('<button id="submitAnswer" class="btn btn-primary customButton" type="submit" value="Results">Done</button>');
    gameItems.append('<p id="error" style="color:red"></p>');
    element.append(gameItems);
}

// Return answer of passed in operation applied to two passed in numbers.
function GetOperationAnswer(one, two, operation) {
    switch (operation) {
        case "+":
            return one + two;
            break;
        case "-":
            return one - two;
            break;
        case "*":
            return one * two;
            break;
        default:
            return one + two;
    }
}

// Add equation question to the passed in element.
function AddEquation(operation, element) {
    var one = Math.floor(Math.random() * MaxNumberOption);
    var two = Math.floor(Math.random() * MaxNumberOption);
    var answer = GetOperationAnswer(one, two, operation);

    // Add Equation.
    element.append('<h1 class="equationField">' + one + operation + two + '=</h1>');

    // Add field to enter answer.
    element.append('<input class="entryFieldClass" type="number" min="-99" max="99" required="" >');

    //Add answer to answerList.
    answerList.push(answer);

    element.append("<hr>");
}

// Return total number of answers that match input and actual answer. Note that this is depended on answerList being filled before hand.
function GetAnswerTotal(entryClassList){
    var total = 0;
    for(i = 0; i < entryClassList.length; i++){
        if(entryClassList[i].value == answerList[i]){
            total++;
        }
    }
    return total;
}

// Add "correct" text at end of each equation that was answered correctly. Note that this is depended on answerList being filled before hand.
function AddCorrectStatements(entryClassList){
    for(i = 0; i < entryClassList.length; i++){
        if(entryClassList[i].value == answerList[i]){
            $("<p style='color:green; display:inline; text-size:30px'> Correct!</p>").insertAfter(entryClassList[i]);
        }
        else{
            $("<p style='color:red; display:inline; text-size:30px'> Miss. Answer: "+ answerList[i] +"</p>").insertAfter(entryClassList[i]);
        }
    }
}

// Increment the currentTime value.
function IncrementTime(){
    currentTime++;
}

function ContainsEmptyString(list){
    for(i = 0; i < list.length; i++){
        if(list[i].value == ""){
            return true; 
        }
    }
    return false;
}