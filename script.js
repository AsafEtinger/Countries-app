let displayContainer = document.querySelector(".display-container");
const searchBtn = document.querySelector(".btn-search");
const input = document.querySelector(".input-search");
const footer = document.querySelector(".footer");
const bigDisplayCard = document.querySelector(".big-country-card");
const moreCountryContainer = document.querySelector(".more-country-info");
const overlay = document.querySelector(".overlay");

searchBtn.addEventListener("click", function () {
  let numCountries = displayContainer.childElementCount;
  console.log(numCountries);

  if (numCountries === 3) {
    displayContainer.firstElementChild.remove();
  }
  country();
});

displayContainer.addEventListener("click", function (e) {
  let countryClick = e.target;
  // console.log(countryClick);
  // console.log(countryClick.dataset.code);

  let countryCode = countryClick.dataset.code;
  console.log(countryCode);
  moreCountryData(countryCode);
});

moreCountryContainer.addEventListener("click", function () {
  bigDisplayCard.firstElementChild.remove();
  overlay.classList.add("hidden");
  footer.classList.remove("hidden");
});

// closeBigCountryInfo();

const country = async function () {
  try {
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${input.value}`
    );

    const [countryJson] = await res.json();

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    console.log(countryJson);

    displayContainer.insertAdjacentHTML(
      "beforeend",
      `
    <div class="country-card">
    <div class="flag">
    <img src=${countryJson.flag} data-code=${countryJson.alpha3Code}>
    </div>
    <div class="country-info">
    <h1 class="country-name">Country - ${countryJson.name}</h1>
    <h1 class="country-language">Language - ${countryJson.languages[0].name}</h1>
    <h1 class="country-population">Population - ${countryJson.population} peoples</h1>
    </div>`
    );

    footer.classList.remove("hidden");

    input.value = "";
  } catch (e) {
    console.error(e);
  }
};

const moreCountryData = async function (country) {
  try {
    const res = await fetch(
      `https://restcountries.eu/rest/v2/alpha/${country}`
    );
    const moreCountryJson = await res.json();

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    bigDisplayCard.insertAdjacentHTML(
      "afterbegin",
      `<div> 
      <div class="flag">
        <img src="${moreCountryJson.flag}" />
      </div>
      <div class="country-info">
        <h1 class="country-name">Country - ${moreCountryJson.name}</h1>
        <h1 class="country-language">Language - ${moreCountryJson.languages[0].name}</h1>
        <h1 class="country-capital">Capital - ${moreCountryJson.capital}</h1>
        <h1 class="country-nativeName">Native name - ${moreCountryJson.nativeName}</h1>
        <h1 class="country-regin">Regin - ${moreCountryJson.region}</h1>
        <h1 class="country-currencies">Currencies - ${moreCountryJson.currencies[0].code} ${moreCountryJson.currencies[0].symbol}</h1>
        <h1 class="country-borders">Borders - ${moreCountryJson.borders}</h1>
      </div> 
      </div>`
    );

    moreCountryContainer.classList.remove("hidden");
    overlay.classList.remove("hidden");
    footer.classList.add("hidden");

    console.log(moreCountryJson);
  } catch (e) {
    console.error(e);
  }
};
