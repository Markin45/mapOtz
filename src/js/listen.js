import addStorageFrom from "./addStorageFrom";
import {upgrateWinFrom} from "./from";
import {mapOnclick_2} from "./map";

export default (myMap,clusterer) => {

    document.addEventListener("click", e => {

        if (e.target.classList.contains("krest_winForm")) { // закрываем окно
            var app = document.querySelector('.app');
            var oldWinForm = document.querySelector('.winForm');
            if (oldWinForm) app.removeChild(oldWinForm);       
        }; 

        if (e.target.classList.contains("winFromAdd")) { // добавляем новый отзыв
            var winForm = document.querySelector('.winForm');
            winForm.querySelector('.context').style.display = "none";
            winForm.querySelector('.loadin').style.display = "block";
            
            addStorageFrom(winForm,myMap,clusterer);
            upgrateWinFrom(winForm);
        }; 

        if (e.target.classList.contains("addrInPlacemark")) { // в группе меток открываем адрес
            var coords = [e.target.dataset.x, e.target.dataset.y];
            var posMouse = [e.clientX, e.clientY];
            mapOnclick_2 (coords,posMouse);
        }; 

    });

}