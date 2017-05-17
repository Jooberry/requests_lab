var app = function(){
  // var button = document.querySelector("button")
  // button.addEventListener("click", function(){
    var savedCountry = localStorage.getItem("country")
    var savedCountryParsed = JSON.parse(savedCountry)
    listInfo(savedCountryParsed)
    var url = "https://restcountries.eu/rest/v2"
    makeRequest(url, requestComplete);

    var select = document.getElementById('country-list')
    select.addEventListener("change", onCountrySelect )
}
var requestComplete = function(){
  //refers to xmlhttprequest object
  if(this.status !== 200) return;

  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  var firstCountry = countries[0]
    populateList(countries)
}

var populateList = function(countries){
  var select = document.getElementById('country-list')
  countries.forEach(function(country){
    var option = document.createElement("option")
    option.innerText = country.name;
    select.appendChild(option);
  })
}
var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();

  request.open("GET", url)
  request.addEventListener("load", callback)
  request.send();
}

var onCountrySelect = function(event){
  var jsonString = this.responseText
  this.value

  var url = "https://restcountries.eu/rest/v2/name/" + this.value
  makeRequest(url, countryInfoRequest);
}

var countryInfoRequest = function(){
  if(this.status !== 200) return;

  var jsonString = this.responseText;
  var countryInfo = JSON.parse(jsonString);
  listInfo(countryInfo[0])
  console.log("this is the border call " + countryInfo[0].borders)
  listBorderingCountries(countryInfo[0].borders)
  saveToStorage(countryInfo[0])
}

var createCountryDiv = function(id, countryInfo){
  var mainDiv = document.getElementById("borders")
  var div = document.createElement('div')
  div.setAttribute("id", id)

  var name = document.createElement('h1')
  name.setAttribute("id", "name" + id)
  name.innerText = countryInfo.name
  div.appendChild(name)

  var capital = document.createElement('h3')
  capital.setAttribute("id", "capital" + id)
  capital.innerText = countryInfo.capital
  div.appendChild(capital)

  var population = document.createElement('h3')
  population.setAttribute("id", "population" + id)
  population.innerText = countryInfo.population
  div.appendChild(population)

  var flag = document.createElement('img')
  flag.setAttribute("id", "flag" + id)
  flag.setAttribute("width", "100px")
  flag.setAttribute("heigth", "70px")
  flag.setAttribute("src", countryInfo.flag)
  div.appendChild(flag)




  mainDiv.appendChild(div)
}

var listInfo = function(countryInfo){
  var name = document.getElementById("name")
  name.innerText =countryInfo.name
  var capital = document.getElementById("capital")
  capital.innerText = "The capital is: " + countryInfo.capital
  var population = document.getElementById("population")
  population.innerText = "The population is: " + countryInfo.population
  var borders = document.getElementById("borders")
  borders.innerText = " Countries that Border are: "
  var flag = document.getElementById("flags")
  flag.setAttribute("src", countryInfo.flag)
  flag.setAttribute("width", "100px")
  flag.setAttribute("heigth", "70px")
}

// var getCountryByCode(code){
//
// }

var listBorderingCountries = function(countries){

  var bordersDiv = document.getElementById('borders')

  var counter = 0
  countries.forEach(function(code){

    var url = "https://restcountries.eu/rest/v2/alpha/" + code
    makeRequest(url, function(){
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      var countryInfo = JSON.parse(jsonString);
        createCountryDiv("div" + counter, countryInfo );
      counter++
    })
  })
}

var saveToStorage = function(country){
  var countryToSave = JSON.stringify(country)
  localStorage.setItem("country", countryToSave)
}
window.addEventListener('load', app);
