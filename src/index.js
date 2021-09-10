import "./style.css";
import { refs } from "./js/refs";
//import { add, before } from "lodash";
import templateMarkup from "./templates/templates.hbs"

class apiService {
  baseUrl = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
  constructor() {
    this.q = '';
    this.pageNumber = 1;
  }
  func() {
    const fullUrl = new URLSearchParams({
      per_page: 12,
      key: '23324590-4bab2876940c1b311e9de8456',
      page: this.pageNumber,
      q: this.q,
    });
    console.log(fullUrl);
    return fetch(`${this.baseUrl}${fullUrl}`)
      .then(response => response.json())
  };

  set something(name) {
    this.q = name;
  };

  numberChanger() {
    this.pageNumber += 1;
  };

  resetSubmit() {
    this.pageNumber = 1;
  }
};
const test = new apiService();

function onSubmitForm(e) {
  e.preventDefault();
  refs.gallery.innerHTML = "";
  test.resetSubmit();
  refs.loadMore.classList.remove("load-btn")
  const userInput = e.currentTarget.elements.query.value;
  test.something = userInput;
  test.func().then(item => {
    const renderMarkup = templateMarkup(item);
    refs.gallery.insertAdjacentHTML("beforeend", renderMarkup);
  });
};

function onLoadMore() {
  test.numberChanger();
  test.func().then(item => {
    const renderMarkup = templateMarkup(item);
    refs.gallery.insertAdjacentHTML('beforeend', renderMarkup);
    smoothsscroll();
  });
}

function smoothsscroll(){
  setTimeout(()=>{
    const element = document.querySelector('body');
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, 500);
};

refs.searchForm.addEventListener('submit', onSubmitForm);

refs.loadMore.addEventListener("click", onLoadMore);
