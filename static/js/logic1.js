// Manage state of game.
const GAMESTATE = {
    MENU: 0,
    PLAY: 1,
    GAMEOVER: 2
}

// Manage operation parts need for setting up the option. (element id, checkbox value, element label).
const OPERATION_LIST = [
    ["add", "+", "Addition (+)"],
    ["minus","-"," Subtraction (-)"],
    ["times","*","Multiplication (*)"]
];

// The options for how many questions a game can have.
const QuestionAmountOptions = [5, 10, 15];

var currentState = GAMESTATE.MENU;

// Number of Questions in game.
var numberOfQuestions = 5;

// Max number possible for equation question.
var MaxNumberOption = 9;

// List containing answers to all questions in a game.
var answerList = [];

var currentTime = 0;
var timer;

setupOption($('#optionPart'));

$("form").submit(function (event) {
    var mainContent = $('#mainContent');

    // If in the menu state then move one to starting game.
    if (currentState == GAMESTATE.MENU) {
        //Setup Number of questions variable.
        numberOfQuestions = parseInt($('#num').val());

        // Resut answerList incase playing again.
        answerList = [];

        for (var i = 0; i < numberOfQuestions; i++) {
            AddEquation($("input[name='operation']:checked").val(), mainContent);
        }

        mainContent.append('<input id="submitAnswer" class="btn btn-primary customButton" type="submit" value="Done">');

        // Clear the form.
        $('#optionPart').empty();

        //Add game timer.
        timer = setInterval(IncrementTime,1000);

        currentState = GAMESTATE.PLAY;
    }
    // If Moving on after playing then move on the the gameOver screen.
    else if(currentState == GAMESTATE.PLAY){
        // Remove Submit answers button.
        $('#submitAnswer').remove();

        clearInterval(timer);

        // Make answer textbox unchangable.
        $('.entryFieldClass').prop('disabled', true);

        // Add correct statements to equations
        AddCorrectStatements($('.entryFieldClass'));

        // Calculate Results and display.
        mainContent.append('<h2>Total Correct: '+GetAnswerTotal($('.entryFieldClass'))+' / '+ numberOfQuestions +'</h2>');
        mainContent.append('<h2>Time: '+currentTime+' Seconds.</h2>');

        mainContent.append('<input id="submitRetry" class="btn btn-primary customButton" type="submit" value="Retry">');
        currentState = GAMESTATE.GAMEOVER;
    }
    // If moving on after gameOver then setup replay.
    else if(currentState == GAMESTATE.GAMEOVER){
        mainContent.empty();
        setupOption($('#optionPart'));
        
        currentState = GAMESTATE.MENU;
    }
    event.preventDefault();

});

//Setup up option selection part at start.
function setupOption(element){
    element.append('<h5>-Descriptions-</h5>');
    element.append('<p>Practice math operations with a bunch of simple math problems to solve. Just set the settings you want and remember that you will be timed so move fast.</p>');
    element.append('<hr>');


    // Setup operation checkbox options.
    element.append('<h5>-Operation-</h5>');
    
    // Add 'checked' for first checkbox option.
    element.append('<input type="radio" id="'+OPERATION_LIST[0][0]+'" name="operation" value="'+OPERATION_LIST[0][1]+'" checked>');
    element.append('<label for="'+OPERATION_LIST[0][0]+'">'+OPERATION_LIST[0][2]+'</label><br>');
    
    for(i = 1; i < OPERATION_LIST.length; i++){
            element.append('<input type="radio" id="'+OPERATION_LIST[i][0]+'" name="operation" value="'+OPERATION_LIST[i][1]+'">');
            element.append('<label for="'+OPERATION_LIST[i][0]+'">'+OPERATION_LIST[i][2]+'</label><br>');
    }
    element.append('<hr>');

    // Setup dropdown part.
    element.append('<h5>-Number of Questions-</h5>');
    var selectSection = $('<select id="num" class="btn btn-secondary"></select>');
    for(i = 0; i < QuestionAmountOptions.length; i++){
        selectSection.append('<option value="'+QuestionAmountOptions[i]+'">'+QuestionAmountOptions[i]+' Questions</option>');
    }
    element.append(selectSection);
    element.append('<hr>');

    element.append('<input type="submit" value="Submit" class="btn btn-primary customButton">');
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

// Add equation question to the passed in element "htmlPlacement".
function AddEquation(operation, htmlPlacement) {
    var one = Math.floor(Math.random() * MaxNumberOption);
    var two = Math.floor(Math.random() * MaxNumberOption);
    var answer = GetOperationAnswer(one, two, operation);

    // Add Equation.
    htmlPlacement.append('<h1 class="equationField">' + one + operation + two + '=</h1>');

    // Add field to enter answer.
    htmlPlacement.append('<input class="entryFieldClass" type="number" min="-99" max="99" required="" >');

    //Add answer to answerList.
    answerList.push(answer);

    htmlPlacement.append("<hr>");
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