import NewsApiService from './js/searchImages';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.css"

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');
loadMoreBtnEl.style.display = 'none';

let lightbox = new SimpleLightbox(".gallery a")

const newApiService = new NewsApiService();

formEl.addEventListener('submit', onCreateImages);
loadMoreBtnEl.addEventListener('click', onLoadMore);

async function onLoadMore() {
  loadMoreBtnEl.style.display = 'none';
  try {
    const result = await newApiService.querySearchImages();
    showTotalHits();
    renderMurkUp(result);
  } catch {
    Notiflix.Notify.failure('error');
  }
}

async function onCreateImages(e) {
  e.preventDefault();
  galleryEl.innerHTML = '';
  loadMoreBtnEl.style.display = 'none';
  newApiService.resetPage();

  newApiService.query = e.target.elements.searchQuery.value.trim();
  formEl.reset();
  if (!newApiService.query) return;

    try {
        const result = await newApiService.querySearchImages();
      
        if (result.hits.length === 0) {
          Notiflix.Notify.warning(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        showTotalHits();
        renderMurkUp(result);
        
    }
    catch {
        Notiflix.Notify.failure('error');
    }
}

function showTotalHits() {
  Notiflix.Notify.success(`Hooray! We found ${newApiService.totalHits} images`);
}

function renderMurkUp(res) {
  const murkUp = res.hits.map(res => createMurkUp(res)).join('');
    galleryEl.insertAdjacentHTML('beforeend', murkUp);
    lightbox.refresh()
  if (newApiService.TOTAL_PAGES === newApiService.page - 1) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    return;
  }
  loadMoreBtnEl.removeAttribute('style');
}


function createMurkUp(data) {
  const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = data;
    return `<div class="photo-card">
   <a class="gallery__link" href=${largeImageURL}>
  <img src=${webformatURL} alt = ${tags} width="340" height="230" loading = "lazy" />
     </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`;
}
