import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import {fetchCountries} from './fetchAPI/fetchCountries';
import counties from './templates/counties.hbs';
import listOfCountries from './templates/listOfCountries.hbs';
const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
}
const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(event){
    if(event.target.value === ''){
        refs.list.innerHTML = '';
        return
    };

    fetchCountries(event.target.value.trim()).then(data => {
        if(data.length > 10){
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.", {
            position: 'center-top',
            timeout: 2000, 
            cssAnimationStyle: 'from-top',
            fontAwesomeIconStyle: 'shadow',
        });
            return;
        };

        if(data.length > 1){
            const listMarkup = listOfCountries(data);
            refs.list.insertAdjacentHTML('beforeend', listMarkup);
            markupRender(listMarkup);
            return;
        };

        if(data.length === 1){
            const markup = counties(data);
            markupRender(markup);
            return;
        };

        if(data.status === 404){
            Notiflix.Notify.failure("Oops, there is no country with that name", {
                position: 'center-top',
                timeout: 2000, 
                cssAnimationStyle: 'from-top',
                fontAwesomeIconStyle: 'shadow',
            });
        };
    });
};

function markupRender(evt){
    refs.list.innerHTML = '';
    refs.list.insertAdjacentHTML('beforeend', evt);
}