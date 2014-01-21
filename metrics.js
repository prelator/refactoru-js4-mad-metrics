// Get current browser viewpane heigtht
 
function get_window_height() {
    return window.innerHeight || 
           document.documentElement.clientHeight ||
           document.body.clientHeight || 0;
}


//Get current absolute window scroll position

function get_window_Yscroll() {
    return window.pageYOffset || 
           document.body.scrollTop ||
           document.documentElement.scrollTop || 0;
}


//Get current absolute document height

function get_doc_height() {
    return Math.max(
        document.body.scrollHeight || 0, 
        document.documentElement.scrollHeight || 0,
        document.body.offsetHeight || 0, 
        document.documentElement.offsetHeight || 0,
        document.body.clientHeight || 0, 
        document.documentElement.clientHeight || 0
    );
}

//Get current vertical scroll percentage
function get_scroll_percentage() {
    return (
        (get_window_Yscroll() + get_window_height()) / get_doc_height()
    ) * 100;
}

//Determine max percentage of page scrolled to
var percentArray = [];
var currentScrollPercent = 0;
var scrollTimer = setInterval(function(){getCurrentScroll();}, 1000);

	//Get current scroll position and push to array
	var getCurrentScroll = function() {
		currentScrollPercent = get_scroll_percentage();
		percentArray.push(currentScrollPercent);
			if (currentScrollPercent === 100) {
			clearInterval(scrollTimer);}						
	};

	//Loop through array to determine largest value
	var getMaxScroll = function() {
		var max = percentArray[0];
		for (i=1;i<percentArray.length; i++){	
			if (percentArray[i] > max) {
				max = percentArray[i];
			}
		} return max;
	};

//Determine total distance scrolled
var totalDist = 0;
var initPos = get_window_Yscroll();                   
var scrollPosTimer = setInterval(function(){getPosition();}, 300);

var getPosition = function(){
     var curPos = get_window_Yscroll();
     var dist = Math.abs(curPos - initPos);
     initPos = curPos;
     totalDist = totalDist + dist;
};

//Determine time since page load
var seconds = 0;
var timeElapsed = function() {
	setInterval(function(){
	seconds++;		
	},1000);
};
timeElapsed();

//Function to be performed on click of signup button
//Alert and store time clicked to variable
var clicked = 0;
var signup = function() {
	clicked = seconds;
	alert('You are signed up!');
};

//Get section heights
var secHeights=[];
$("section").each(function(){secHeights.push($(this).height());});

//Get section offsets to determine start position of each section
var secOffsets=[];
$("section").each(function(){secOffsets.push($(this).offset().top);});

//Calulate section endpoints
var secEndPoints = [];
for (i=0; i < secHeights.length || i< secOffsets.length; i++) {
    secEndPoints.push(secHeights[i] + secOffsets[i]);
}

//Get current Yscroll position every second 
//Store how many seconds spent on each section in an array
var posTime = [];
for (i=0; i < secHeights.length || i < secOffsets.length || i < secEndPoints.length; i++) {
    posTime[i] = 0;
}
var secPosTimer = setInterval(function(){getSection();}, 1000);

var getSection = function(){
    var curPos = get_window_Yscroll();
    for (i=0; i < secHeights.length || i < secOffsets.length || i < secEndPoints.length; i++){
        if (curPos > secOffsets[i] && curPos < secEndPoints[i]) {
            posTime[i] = posTime[i] + 1;
        }
    }
};

    
//Master function to be peformed when metrics button clicked
var metrics  = function() {alert("You have viewed " + 
Math.round(getMaxScroll()) + "% of the page. "+ 
"\nYou are currently " + Math.round(get_scroll_percentage()) + 
"% of the way down the page." + "\nTotal distance scrolled: " + 
totalDist + " pixels" + "\nTime spent on page: " + seconds + 
" seconds" +"\nTime before signup button clicked: " + clicked + " seconds" +
"\nTime spent on each section (in seconds): " + posTime);  
};