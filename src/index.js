import './css/style.css'
import {mapInit, mapDivCreat,mapOnclick,mapAddAllPoint} from "./js/map";
import listen from "./js/listen";

document.addEventListener("DOMContentLoaded", () => {
    var app = document.querySelector('.app');

    (async () => {
        mapDivCreat(app);
        var myMap = await mapInit();

        var clusterer = new ymaps.Clusterer({ //// кластеризатор
            clusterDisableClickZoom: true
        });

        mapAddAllPoint(myMap,clusterer);

        myMap.events.add('click', e => mapOnclick(myMap,e));
        listen(myMap,clusterer);
    })();   

});