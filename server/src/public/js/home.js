// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('tr');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'TR') {
    ev.target.classList.toggle('checked');
  }
}, false);

// post create card
function createCardToDb(body, startTime, endTime) {
  var inputBody = document.createElement('input');
  inputBody.value = body; 
  inputBody.setAttribute('name', 'body');
  
  var inputValueStartTime = document.createElement('input');
  inputValueStartTime.value = startTime; 
  inputValueStartTime.setAttribute('name', 'startTime');
  
  var inputValueEndTime = document.createElement('input');
  inputValueEndTime.value = endTime;  
  inputValueEndTime.setAttribute('name', 'endTime');
  

  var form =  document.forms[0]; 
  form.appendChild(inputBody);
  form.appendChild(inputValueEndTime);
  form.appendChild(inputValueStartTime);
  form.submit()
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("td");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);

  var inputValueStartTime = document.getElementById("startTime").value;
  var inputValueEndTime = document.getElementById("endTime").value;

  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
    createCardToDb(inputValue, inputValueStartTime, inputValueEndTime)
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}