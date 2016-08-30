var leftNumber = 0;
var rightNumber = 0;
var answer = 0;
var first_option=0;
var second_option=0;
var correctAnwers = 0;
var total = 0;
var countDown;
var timer = 5000;
var difficulty = 15;
var multiplication_difficulty = 2;
var progress;
var start;
var OPERATION = {
		ADD: "addition",
		SUBS: "substraction",
		MULTI: "multiplication"
	}
var operation = OPERATION.ADD;

 $(document).ready(function () {
    $(".answer-option").click(function (e) {
		clearInterval(countDown);
		startGame();
    });
});

$(".button").click(function(e){
	operation = $(e.target).val();
	clearInterval(countDown);
	startGame();
})

var startCountDown = function(){
	countDown = setInterval(changeQuestion,timer)
}

function getRandomNumber(){
	var num = Math.floor(Math.random()*difficulty)
	while(num == 0){
		num = Math.floor(Math.random()*difficulty)
	}
	return num;
}

function showProgress(){
	var sec = timer/10;
	var progressWidth = 100/sec;
	$(".progress").css('width',progressWidth+'%');
	progress = setInterval(function(){
		progressWidth = progressWidth + 100/sec;
		$(".progress").css('width',progressWidth+'%');

	},10)
}

var changeQuestion = function(){
	leftNumber = getRandomNumber()
	rightNumber = getRandomNumber()
	var displayOp = "+"
	switch(operation){
		case "substraction" : 
			displayOp = "-";
			leftNumber = Math.max(leftNumber, rightNumber)
			rightNumber = Math.min( rightNumber , leftNumber)	
			break;
		case "multiplication" :
		displayOp = "x";
		leftNumber = Math.floor(getRandomNumber()/multiplication_difficulty);
		rightNumber = Math.floor(getRandomNumber()/multiplication_difficulty);
		break;
	}
	$('#left-block').html(leftNumber);
	$('#op-block').html(displayOp);
	$('#right-block').html(rightNumber);
	updateScore();
	clearInterval(progress)
	showProgress();
	displayAnswers();
	total ++;
}

var displayAnswers = function(){
	var options = getAnswerOptions();	
	$('#first-option').html(options.first_option);
	$('#second-option').html(options.second_option);
	$('#third-option').html(options.third_option);
}


function updateScore(){
	$("#points").html(correctAnwers+" / "+total);
}

function getAnswerOptions (){
	var answer = 0;
	switch(operation){
		case "addition" : 
			answer = leftNumber+rightNumber;
			break;
		case "substraction" : 
			answer = leftNumber-rightNumber;
			break;
		case "multiplication" :
		answer = leftNumber*rightNumber;
		break;
	}
	var options =[answer, (answer + getRandomNumber()), Math.abs(answer - getRandomNumber())];
	var pos = getRandomNumber()%3;
	options.splice(pos,0,answer);
	options.shift();
	return{
		"first_option": options[0],
		"second_option": options[1],
		"third_option": options[2]
	}
}
function startGame(){
	changeQuestion();	
	startCountDown();
}
startGame();