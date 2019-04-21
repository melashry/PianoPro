
var elem = document.getElementById('myCanvas');
var username = document.getElementsByClassName('username')[0]
username.textContent = (JSON.parse(window.localStorage.getItem('username'))).toUpperCase()


function collides(rects, x, y) {
    var isCollision = false;
    for (var i = 0, len = rects.length; i < len; i++) {
        var left = rects[i].x, right = rects[i].x+rects[i].w;
        var top = rects[i].y, bottom = rects[i].y+rects[i].h;
        if (right >= x
            && left <= x
            && bottom >= y
            && top <= y) {
            isCollision = rects[i];
        }
    }
    return isCollision;
}

// check if context exist
if (elem && elem.getContext) {
    // list of rectangles to render
    var rects = [{x: 0, y: 0, w: 50, h: 50},
                 {x: 75, y: 0, w: 50, h: 50}];
  // get context
  var context = elem.getContext('2d');
  if (context) {

      for (var i = 0, len = rects.length; i < len; i++) {
        context.fillRect(rects[i].x, rects[i].y, rects[i].w, rects[i].h);
      }

  }

    // listener, using W3C style for example
    elem.addEventListener('click', function(e) {
        console.log('click: ' + e.offsetX + '/' + e.offsetY);
        var rect = collides(rects, e.offsetX, e.offsetY);
        if (rect) {
            console.log('collision: ' + rect.x + '/' + rect.y);
        } else {
            console.log('no collision');
        }
    }, false);
}

// login validation
function validate(e) {
  e.preventDefault();
  var username = document.getElementById('name').value;
  var err_msg = document.getElementsByClassName('validate-error')[0];
  if (username == '') {
    err_msg.style.display = 'block'
  }else{
    window.localStorage.setItem('username', JSON.stringify(username));
    window.location.href = 'homeGame.html'
  }
}
