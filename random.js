var leftNumber = 0;
var rightNumber = 0;
var answer = 0;
var correctAnwers = 0;
var total = 0;
var countDown;
var timer = 5000;
var difficulty = 15;
var progress;

 $(document).ready(function () {
 	$("#input-block-result").focus();
    $("#input-block-result").keyup(function (e) {
        if (e.keyCode == 13) {
        	if($("#input-block-result").val() == answer){
				correctAnwers++;				
        	}        	
			clearInterval(countDown);
			startGame();
        	$("#input-block-result").val("")
        }
    });
});
$(document).click(function(){
	$("#input-block-result").focus();
})
var changeNumber = function(){
	countDown = setInterval(changeNumberValue,timer)
}

function getRandomNumber(){
	return Math.floor(Math.random()*difficulty)
}
function showProgress(){
	var sec = timer/10;
	var progressWidth = 500/sec;
	$(".progress").css('width',progressWidth+'px');
	progress = setInterval(function(){
		progressWidth = progressWidth + 500/sec;
		$(".progress").css('width',progressWidth+'px');

	},10)
}

var changeNumberValue = function(){
	leftNumber = getRandomNumber()
	rightNumber = getRandomNumber()

	document.getElementById('left-block').innerHTML = leftNumber;
	document.getElementById('right-block').innerHTML = rightNumber;
	answer = leftNumber+rightNumber;	
	updateScore();
	clearInterval(progress)
	showProgress();
	total ++;
}
function startGame(){
	changeNumberValue();
	changeNumber(); 
}
function updateScore(){
	$("#points").html(correctAnwers+" / "+total);
}
startGame();
