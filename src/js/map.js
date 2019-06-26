import {createNewWinFrom,upgrateWinFrom} from "./from";

export var mapInit = () => {  // взято из документации яндекса
    return new Promise((resolve) => {
        ymaps.ready(()=>{
            var myMap = new ymaps.Map("map", {
                center: [55.76, 37.64],
                zoom: 11
            });
                    
            resolve(myMap);
        });
    });
}

export var mapAddAllPoint = (myMap,clusterer) => {  // Добавить все точки

    if (localStorage.getItem('otz') !== null) {
        var allOTZ = JSON.parse(localStorage.getItem('otz'));
        for (let obj of allOTZ) {
            mapAddOnePoint(myMap,clusterer,obj)
        }
    };

}

var index = 0;

export var mapAddOnePoint = (myMap,clusterer,obj) => {  // Добавить Одну точку
    index++;

    console.log(obj);

    var myPlacemark = new ymaps.Placemark(
        [obj.x, obj.y],
        {
            clusterCaption: 'Отзыв <strong>' + index + '</strong>',
            balloonContentFooter:`<div style="text-align: right;font-size: 10px;">${obj.data}</div>`,
            balloonContentBody: `Место: ${obj.place}<br>Адрес:  <span class="addrInPlacemark" data-y="${obj.y}" data-x="${obj.x}">${obj.addr}</span><br><br><b>${obj.name}</b><br>${obj.text}`
        }
    );
    console.log("0000000");

    clusterer.add(myPlacemark);
    console.log("111111");
    myMap.geoObjects.add(clusterer);


    /*myPlacemark.events.add('click', e => mapOnclick(myMap,e));*/
    myPlacemark.events.add('click', e => {
        e.preventDefault();
        var posMouse = e.get('position');
        var coords = myPlacemark.geometry.getCoordinates()
        mapOnclick_2(coords,posMouse);
    });

    console.log("222222");

}

export var mapDivCreat = (app) => { // создаем <div id="map" style="height: 100%; width: 100%;"></div>
    var newDiv = document.createElement('div');
    newDiv.id = "map";
    newDiv.style.height = "100%";
    newDiv.style.width = "100%";
    app.appendChild(newDiv);
}

export var mapOnclick = (myMap,e) => { //определяем функцию которая вызывается при клике по карте
    var coords = e.get('coords');
    var posMouse = e.get('position');
    mapOnclick_2(coords,posMouse);
}

export var mapOnclick_2 = (coords,posMouse) => {
    (async () => {
        var winForm = createNewWinFrom(posMouse);

        try {
            var res = await ymaps.geocode(coords);
            var addr = res.geoObjects.get(0).getAddressLine();
            if (!winForm) return;
            if (addr === undefined) throw new Error('не можем определить место!');
            winForm.dataset.x = coords[0];
            winForm.dataset.y = coords[1];
            winForm.dataset.addr = addr;

            upgrateWinFrom(winForm);
        
        } catch (error) {
            if (!winForm) return;
            winForm.querySelector('.context').style.display = "none";
            winForm.querySelector('.loadin').style.display = "none";
            winForm.querySelector('.addr').innerHTML = `Ошибка: ${error}`;
            console.log(error);
        }
    })();   
    
}