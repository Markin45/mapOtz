import {mapAddOnePoint} from "./map";

var nowdata = () => {
    var Data = new Date();
    var Year = Data.getFullYear();
    var Month = Data.getMonth();
    var Day = Data.getDate();
    var fMonth;

    // Преобразуем месяца
    switch (Month){
        case 0: fMonth="января"; break;
        case 1: fMonth="февраля"; break;
        case 2: fMonth="марта"; break;
        case 3: fMonth="апреля"; break;
        case 4: fMonth="мае"; break;
        case 5: fMonth="июня"; break;
        case 6: fMonth="июля"; break;
        case 7: fMonth="августа"; break;
        case 8: fMonth="сентября"; break;
        case 9: fMonth="октября"; break;
        case 10: fMonth="ноября"; break;
        case 11: fMonth="декабря"; break;
    }

    return Day+" "+fMonth+" "+Year;
}


export default (winForm,myMap,clusterer) => {  // Добавить новый отзыв на сервер
    var formOtz = document.forms.formOtz;
    var name = formOtz.elements.otzName.value;
    var place = formOtz.elements.otzPlace.value;
    var text = formOtz.elements.otzText.value;
    var addr = winForm.dataset.addr;
    var x = winForm.dataset.x;
    var y = winForm.dataset.y;
    var data = nowdata();

    var obj = {name,place,text,addr,x,y,data}
    var oneOTZ=[obj];

    if (localStorage.getItem('otz') === null) {
        localStorage.setItem('otz', JSON.stringify(oneOTZ));
    }else{
        var allOTZ = JSON.parse(localStorage.getItem('otz'));
        var allOTZ2 = allOTZ.concat(oneOTZ);
        localStorage.setItem('otz', JSON.stringify(allOTZ2));
    };

    ////добавляем новую метку на карту
    mapAddOnePoint(myMap,clusterer,obj);

}