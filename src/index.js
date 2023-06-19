import './css/index.css';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

let catsBreeds = [];

const catsList = document.querySelector('.breed-select');
const loadMsg = document.querySelector('.loader');
const errorMsg = document.querySelector('.error');
const catCard = document.querySelector('.cat-info');
 
//loadMsg.setAttribute("hidden", true); - варіант без CSS ховати елемент на сторінці
//errorMsg.setAttribute("hidden", true); - але в ДЗ написано що потрібно робити за допомогою CSS )
loadMsg.classList.add("is-hidden");
errorMsg.classList.add("is-hidden");
createCatsList();

catsList.addEventListener('change', onSelect);

function onSelect() {
    clearCatInfo()
    loadMsg.classList.remove("is-hidden");
    const breedId = catsList.options[catsList.selectedIndex].value;
    const catName = catsList.options[catsList.selectedIndex].text;
    fetchCatByBreed(breedId).then(data => {
        insertCatCard(data, catName);
        loadMsg.classList.add("is-hidden");
    }).catch(() => {
        loadMsg.classList.add("is-hidden");
        onError();
    });
    //loadMsg.classList.add("is-hidden");
}

function createCatsList() {
    loadMsg.classList.remove("is-hidden");
    fetchBreeds().then(data => {
        catsBreeds = data;
        for (let i = 0; i < catsBreeds.length; i++) {
            const breed = catsBreeds[i];
            let option = document.createElement('option');
            option.setAttribute("value", breed.id);
            option.innerText = breed.name;
            catsList.appendChild(option);
        }
        loadMsg.classList.add("is-hidden");
    }).catch(() => {
        loadMsg.classList.add("is-hidden");
        onError();
    });
    }

function insertCatCard(catData, catName) {
    const catInfo = catData[0];
    catCard.innerHTML = `<div><img src="${catInfo.url}" alt="${catName}" width="450"></div><div><h1>${catName}</h1><p>${catInfo.breeds[0].description}</p><h2>Temperament</h2><p>${catInfo.breeds[0].temperament}</p></div>`;
} 

function clearCatInfo() { 
    catCard.innerHTML = '';
}

export function onError() { 
Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
}
 
