let displayContainer = document.querySelector(".display-container");
const searchBtn = document.querySelector(".btn-search");
const input = document.querySelector(".input-search");

searchBtn.addEventListener("click", function () {
  const country = async function () {
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
      <img src=${countryJson.flag}>
      </div>
      <div class="country-info">
      <h1 class="country-name">Country - ${countryJson.name}</h1>
      <h1 class="country-language">Language - ${countryJson.languages[0].name}</h1>
      <h1 class="country-population">Population - ${countryJson.population} peoples</h1>
      </div>`
    );
  };

  country();

  input.value = "";
});
