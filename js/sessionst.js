function clickImg(e) {
    var img = e.target.name;
    window.localStorage.setItem('imgCharacter', JSON.stringify(img));
    window.location.href = 'homeGame.html'
}

function clickLevel(e) {
    var level = e.target.name;
    window.localStorage.setItem('level', JSON.stringify(level));
    window.location.href = 'homeGame.html'
}