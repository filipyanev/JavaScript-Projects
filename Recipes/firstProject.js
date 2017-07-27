  document.getElementById('slImg').style.display = "none";

  function shrDiv() {
  	document.getElementById('header').id = "shHeader";
  	document.getElementById('slImg').style.display = "block";
		document.getElementById('menuBar').style.display = "block";
  }

  function showDiv() {
  	document.getElementById('shHeader').id = "header";
  	document.getElementsByClassName('slideImg').style.display = "none";

  }

  function moveDiv() {
  	d.style.position = "absolute";
  	d.style.left = leftPos + "px";
  	leftPos -= 2;
  }

  function makeBiggerDiv1(x) {
  	document.getElementById("cont11").style.zIndex = "40";
  	x.style.width = "100%";
  }

  function normalizeDiv1(x) {
  	x.style.width = "40%";
  	document.getElementById("cont11").style.zIndex = "10";
  	document.getElementById("cont11").style.boxShadow = "none";
  	document.getElementById("cont11").style.left = "0px";
  }

  function makeBiggerDiv2(x) {
  	document.getElementById("cont22").style.zIndex = "40";
  	document.getElementById("cont22").style.left = "0px";
  	x.style.width = "100%";
  }

  function normalizeDiv2(x) {
  	document.getElementById("cont22").style.zIndex = "20";
  	document.getElementById("cont22").style.boxShadow = "none";
  	document.getElementById("cont22").style.left = "33.3%";
  	x.style.width = "40%";
  }

  function makeBiggerDiv3(x) {
  	document.getElementById("cont33").style.zIndex = "40";
  	document.getElementById("cont33").style.left = "0px";
  	x.style.width = "100%";
  }

  function normalizeDiv3(x) {
  	document.getElementById("cont33").style.zIndex = "30";
  	document.getElementById("cont33").style.boxShadow = "none";
  	x.style.width = "40%";
  	document.getElementById("cont33").style.left = "66.6%";
  }

  function closeHDiv() {
  	document.getElementById("hiddenDiv").style.display = "none";
  	document.getElementById("hdContent").style.display = "none";
  	document.getElementById('myAcc').style.transform = "rotate(5deg)";
  	document.getElementById('myContacts').style.transform = "rotate(5deg)";

  }

  function showRecipe() {
    document.getElementById('fcr').style.display = "none";
  	document.getElementById('firstContainer').style.display = "block";


  }