"use strict";

/*
    JavaScript assignment

    Raminder Singh
    */

import { select, print, onEvent } from "./utils.js";

const moviesInput = select(".search-movies");
const cityInput = select(".search-cities");

let listmovies = select(".autoFill-movie");
let listCities = select(".autoFill-city");

moviesInput.value = "";
cityInput.value = "";

const moviesUrl = "./assets/scripts/movies.json";
const citiesUrl = "./assets/scripts/cities.json";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
  mode: "cors",
};

async function getMovies() {
  try {
    const response = await fetch(moviesUrl, options);

    if (!response.ok)
      throw new Error(`${response.statusText} ${response.status}`);

    const data = await response.json();
    const grid = select(".grid-container");
    

    function getInfo(array) {
      grid.innerHTML = "";

      array.forEach((element) => {
        grid.innerHTML += ` <div class="grid-item">
        <div class="poster">
        <img
        src="${element.img}"
        alt="movie-poster"
        />
        </div>
        <p class="movie-title">${element.title}</p>
        `;
      });
    }
    getInfo(data.results);

    function autoInputs(array, input) {
      onEvent( "keyup", input, function () {
        let inputValue = input.value.toLowerCase();

        if (inputValue.length === 0) return;

        listmovies.innerHTML = " ";

        array.forEach((el) => {
          if (
            el.title.substr(0, inputValue.length).toLowerCase() === inputValue
          ) {
            listmovies.innerHTML += `<li><button>${el.title}</button></li>`;
          }
        });
      });
    }
    autoInputs(data.results, moviesInput);
  } catch (error) {
    print(error.message);
  }
}

getMovies();

function removeDropdown(input, list) {
  if (input.value.length === 0) list.innerHTML = "";
}



async function getCities() {
  try {
    const response = await fetch(citiesUrl, options);

    if (!response.ok)
      throw new Error(`${response.statusText} ${response.status}`);

    const data = await response.json();

    function autoInput(array, input) {
      onEvent( "keyup", input, function () {
        let inputValue = input.value.toLowerCase();

        if (inputValue.length === 0) return;

        listCities.innerHTML = " ";

        array.forEach((el) => {
          if (
            el.name.substr(0, inputValue.length).toLowerCase() === inputValue
          ) {
            listCities.innerHTML += `<li><button>${el.name}</button></li>`;
          }
        });
      });
    }

    
    autoInput(data.cities, cityInput);
  } catch (error) {
    print(error.message);
  }
}

getCities();