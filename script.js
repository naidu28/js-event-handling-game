window.onload = function() {
  window.setInterval(projectiles, 500);
  window.setInterval(randomEnemies, 3000);
  setMusic();
}

function setMusic() {
  var audio = new Audio('mario-star.mp3');
  audio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
  audio.play();
}

function projectiles() {
  //console.log("is this code being hit");
  nyan = document.getElementById("movable");
  nStyles = getComputedStyle(nyan);
  body = document.body;

  //find top + height/2, left + width of #movable
  //create object
  function spawning() {
    console.log(this);
    var p = document.createElement("div");
    p.className = "projectile";
    //alert(nyan.style.width);
    //console.log("hey: " +nStyles.getPropertyValue("width"));
    p.style.left = (parseInt(nStyles.getPropertyValue("left").replace("px", "")) + parseInt(nStyles.getPropertyValue("width").replace("px",""))) + "px";
    //console.log(p.style.left);
    p.style.top = (parseInt(nStyles.getPropertyValue("top").replace("px", "")) + parseInt(nStyles.getPropertyValue("height").replace("px",""))/2) - 10 + "px";
    //console.log(p.style.top);
    body.appendChild(p);
  }

  function moving() {
    //search through body for ".projectiles"
    //move every projectile object by left + 5
    var arr = body.getElementsByClassName("projectile");
    //console.log(arr);

    Array.prototype.forEach.call(arr, function(e) {
      var eStyles = getComputedStyle(e);
      var eLeft = parseInt(eStyles.getPropertyValue("left").replace("px", ""));
      var vw = window.innerWidth;
      if (vw < eLeft + 60) {
        body.removeChild(e);
      } else {
        e.style.left = (eLeft + 50) + "px";
      }
    });

    var arrEnem = body.getElementsByClassName("enemy");

    Array.prototype.forEach.call(arrEnem, function(e) {
      var eStyles = getComputedStyle(e);
      var eLeft = parseInt(eStyles.getPropertyValue("left").replace("px", ""));
      if (eLeft < 0) {
        body.removeChild(e);
      } else {
        e.style.left = (eLeft - 50) + "px";
      }
    });
  }

  spawning();
  moving();
}

/*function scale(e) {
  e.id = "movable-scaled";
}*/

function move(elem, eve) {
  var obj = document.getElementById("movable");
  var styles = getComputedStyle(document.getElementById("movable"));
  //alert(eve.keyCode);
  //97 - a
  //115 - s
  //100 - d
  //119 - w
  //alert(eve.keyCode);
  if (eve.keyCode == "97") {
    var val = parseInt(styles.getPropertyValue("left").replace("px", "")) - 5 + "px";
    //console.log("original left: " +styles.getPropertyValue("left")+ " recalculated: " +val);
    obj.style.left = parseInt(styles.getPropertyValue("left").replace("px", "")) - 40 + "px";
  } else if (eve.keyCode == "100") {
    obj.style.left = parseInt(styles.getPropertyValue("left").replace("px", "")) + 40 + "px";
  } else if (eve.keyCode == "119") {
    obj.style.top = parseInt(styles.getPropertyValue("top").replace("px", "")) - 40 + "px";
  } else if (eve.keyCode == "115") {
    obj.style.top = parseInt(styles.getPropertyValue("top").replace("px", "")) + 40 + "px";
  } else {
    //alert("youre a dingus");
  }
}

function randomEnemies() {
  //alert(window.innerWidth);
  var x = parseInt(window.innerWidth) - 50;
  var y = Math.random()*parseInt(window.innerHeight);

  var e = document.createElement("div");
  e.className = "enemy";

  e.style.left = x + "px";
  if (y < 20) {
    y = y + 50;
  } else if (y > window.innerHeight - 40) {
    y = y - 50;
  }

  e.style.top = y + "px";

  document.body.appendChild(e);
}
