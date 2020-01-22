// rollover functions
// asw  2001

// menuAxn called when mouse rolls over or off an anchor link
// ancha = <A href anchor object
// action = 'out' or 'over'
// image = name of pointer image to change, if any
//   if image is specified, the following two images are interchanged:
//   arrow_blank.gif and arrow.gif, with arrow.gif displayed when
//   the mouse is over the link.

var imgdir = "/global/images/nav/";
var arrow_page = imgdir + "arrow_b.gif";
var linearrow_page = imgdir + "linearrow_b.gif";
var line = imgdir + "line.gif";
var arrow_blank = imgdir + "arrow_blank.gif";
var imgbuf = new Array();

function rollimg(image) {
    if(image == null) image = "arrow.gif";
    if(imgbuf[image] == null)
        imgbuf[image] = imgdir + image;
    return imgbuf[image];
}

function menuOver(name, image) {
    image = rollimg(image);
    return menuAxn('over', name, image);
}
function menuOut(name) {
    return menuAxn('out', name);
}

function menuAxn(action, name, image) {
    var thisImg = eval("document." + name);

    if(thisImg == null) return;

    // navigator 3?  abort, abort
    if(navigator.userAgent.indexOf("Mozilla/3") == 0) return;

    if(action == "over") {
        thisImg.prevsrc = thisImg.src;
        //alert("prevsrc = " + thisImg.prevsrc);
        thisImg.src = image;
    }
    else if(action == "out") {
        thisImg.src = (thisImg.prevsrc != null) ?
        	thisImg.prevsrc : arrow_blank;
    }
    else {
        // whine
        alert("menuAxn: neither over nor out");
    }
}

function endswith(string, ending) {
    var len = string.length;
    return (string.substring(len - ending.length, len) == ending) ? 1 : 0;
}

// finds index of needle in haystack
// searching backwards from end of haystack
function lastIndexOf(needle, haystack) {
    //alert("needle:" + needle + ", haystack:" + haystack);

    if(needle == null || haystack == null) return -1;

    var len = needle.length;
    var i = haystack.length - len;

    for(; i >= 0; i--) {
        if(haystack.substring(i, i + len) == needle)
            return i;
    }
    return -1;
}

function basename(file) {
    var j;
    return ((j = lastIndexOf("/", file)) >= 0) ?
        file.substring(j + 1, file.length) : file;
}

// display page arrow next to current page in secondary nav
// (doesn't work in N4, sigh)
function show_curnav(prefix, max) {

    var i, j;
    var file = document.location + "";  // cast to string

    // navigator 3?  abort, abort
    if(navigator.userAgent.indexOf("Mozilla/3") == 0) return;

    // strip path from document name
    file = basename(file);

    if(file.length == 0) return;
    var links = document.links;

    // search for link matching current document
    for(i = 0; i <= max; i++) {
        var aname = "a_" + prefix + i + "p";
        var funkImg = eval("document." + prefix + i + "p");
        var funkA = null;

        // find anchor (link) in doc corresonding to this aname
        for(j = 0; j < links.length; j++) {
	  if(links[j].name == aname) {
	      funkA = links[j].href + "";
	      break;
	  }
        }
        if(funkA == null) continue;

        //alert("checking " + file + " against " + funkA);
        if(funkA.indexOf(file) >= 0) {
	  //alert("found matching anchor: " + funkA);
	  //alert("funkimg.src = " + funkImg.src);
            var prevsrc = basename(funkImg.src);
	  funkImg.src = (prevsrc == "line.gif" ? 
		linearrow_page : arrow_page);
	  break;
        }
    }
}

