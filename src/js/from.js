import HBSwinFrom from '../hbs/winFrom.hbs';

export var createNewWinFrom = (posMouse) => { // создает новое окно
    var app = document.querySelector('.app');

    var oldWinForm = document.querySelector('.winForm');
    if (oldWinForm) app.removeChild(oldWinForm);

    var x = posMouse[0];
    var y = posMouse[1];

    if (y+530 > innerHeight) y = innerHeight-530;
    if (x+380 > innerWidth) x = x-380;

    var winForm = document.createElement('div');
    winForm.className = "winForm";
    winForm.id = "id"+Math.floor(Math.random() * 100);
    winForm.style.left = x + 'px';
    winForm.style.top = y + 'px';
    var context = {addr: "Загрузка...",showLoading:1};
    winForm.innerHTML = HBSwinFrom(context);

    winForm.querySelector(".otz").scrollTop = 9999;

    app.appendChild(winForm);

    return winForm;
}

export var upgrateWinFrom = (winForm) => { // обновить окно

    var addr = winForm.dataset.addr;
    var allOTZ2 = [];

    if (localStorage.getItem('otz') !== null) {
        var allOTZ = JSON.parse(localStorage.getItem('otz'));
        allOTZ2 = allOTZ.filter((obj) => {
            if (obj.addr == addr) return true;
        });
    };

    var context = { addr: addr, showContext:1, otz:allOTZ2 };
    winForm.innerHTML = HBSwinFrom(context);

    winForm.querySelector(".otz").scrollTop = 9999;

}