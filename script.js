let displayContainer = document.querySelector(".display-container");
const searchBtn = document.querySelector(".btn-search");
const input = document.querySelector(".input-search");
const footer = document.querySelector(".footer");
const bigDisplayCard = document.querySelector(".big-country-card");
const moreCountryContainer = document.querySelector(".more-country-info");
const overlay = document.querySelector(".overlay");
const searchInput = document.getElementById("search");
const searchWrapper = document.querySelector(".wrapper");
const resultsWrapper = document.querySelector(".results");

input.focus();

searchBtn.addEventListener("click", function () {
  let numCountries = displayContainer.childElementCount;

  if (numCountries === 3) {
    displayContainer.firstElementChild.remove();
  }
  country();
});

displayContainer.addEventListener("click", function (e) {
  let countryClick = e.target;

  let countryCode = countryClick.dataset.code;

  moreCountryData(countryCode);
});

moreCountryContainer.addEventListener("click", function () {
  bigDisplayCard.firstElementChild.remove();
  overlay.classList.add("hidden");
  footer.classList.remove("hidden");
});

const country = async function () {
  try {
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${input.value}`
    );

    console.log(res);
    const [countryJson] = await res.json();

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

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
    alert(`We couldn't find this country, please type again`);
    input.value = "";
    input.focus();
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
        <h1 class="country-regin">Region - ${moreCountryJson.region}</h1>
        <h1 class="country-currencies">Currencies - ${moreCountryJson.currencies[0].code} ${moreCountryJson.currencies[0].symbol}</h1>
        <h1 class="country-borders">Borders - ${moreCountryJson.borders}</h1>
      </div> 
      </div>`
    );

    moreCountryContainer.classList.remove("hidden");
    overlay.classList.remove("hidden");
    footer.classList.add("hidden");
  } catch (e) {
    console.error(e);
    input.focus();
  }
};

// live search------

searchInput.addEventListener("keyup", function () {
  let results = [];
  let input = searchInput.value;
  if (input.length) {
    results = searchable.filter((item) => {
      return item.toLowerCase().includes(input.toLowerCase());
    });
  }
  renderResults(results);
});

const renderResults = function (results) {
  if (!results.length) {
    return searchWrapper.classList.remove("show");
  }

  const content = results
    .map((item) => {
      return `<li>${item}</li>`;
    })
    .join("");
  console.log(content);

  searchWrapper.classList.add("show");
  resultsWrapper.innerHTML = `<ul>${content}</ul>`;
};

resultsWrapper.addEventListener("click", function (e) {
  let country = e.target.textContent;
  console.log(country);
  searchInput.value = country;
  searchWrapper.classList.remove("show");
  input.focus();
});

let searchable = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central Arfrican Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cuba",
  "Curacao",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "St Lucia",
  "St Vincent",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
