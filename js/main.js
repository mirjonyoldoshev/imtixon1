const root = document.querySelector(".row");
const api = "https://restcountries.com/v3.1/all";
const input = document.querySelector(".input");
let data = [];



let modeBtn = document.getElementById("mode-btn");

modeBtn.addEventListener("click", function () {
  if (document.body.className != "dark") {
    this.firstElementChild.src = "images/light.svg";
  } else {
    this.firstElementChild.src = "images/dark.svg";
  }
  document.body.classList.toggle("dark");
});

async function fetchApi(url) {
  try {
    let response = await fetch(url);
    if (response.status === 200) {
      data = await response.json();
      renderData(data);
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
}
fetchApi(api);

function renderData(e) {
  root.textContent = "";
  if (e.length) {
    const fragment = document.createDocumentFragment();
    e.slice(0,12).forEach((element) => {
      console.log(element.flags);
      const cart = document.createElement("div");
      cart.className = "card col-lg-3";
      cart.innerHTML = `
        <div class='card-body'>
        <img class='card-img-top' src=${element?.flags.png} alt="njjj"/>
        <h1 class="card-title" style="color:yellow">${element.name.common}</h1>
        </div>
      `;
      fragment.appendChild(cart);
    });
    root.appendChild(fragment);
  }
}

input.addEventListener("input", (e) => {
  let searchData = data.filter((element) =>
    element.name.common.toLowerCase().includes(input.value.toLowerCase())
  );
  console.log(searchData);
  renderData(searchData);
});










