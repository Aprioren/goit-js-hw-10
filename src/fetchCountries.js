export {fetchCountries};

function fetchCountries(counrty){
   return fetch(`https://restcountries.com/v3.1/name/${counrty}?fields=name,official,capital,population,flags,languages`)
   .then(response => response.json())
};
