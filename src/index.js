import NewsApiService from './js/searchImages';
import Notiflix from 'notiflix';


const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more')
loadMoreBtnEl.style.display = 'none'

const newApiService = new NewsApiService


formEl.addEventListener('submit', onCreateImages);
loadMoreBtnEl.addEventListener('click', onLoadMore)

  async function onLoadMore() {
   
      loadMoreBtnEl.style.display = 'none'
      const result = await newApiService.querySearchImages();
     renderMurkUp(result)
}


async function onCreateImages(e) {
  e.preventDefault();
  galleryEl.innerHTML = '';
    loadMoreBtnEl.style.display = 'none'
     
    
    newApiService.query = e.target.elements.searchQuery.value.trim();
     formEl.reset()
  if (!newApiService.query) return;

    const result = await newApiService.querySearchImages();
    newApiService.resetPage()

  if (result.hits.length === 0) {
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
    renderMurkUp(result)
  
  
}

function renderMurkUp(res) {
     const murkUp = res.hits.map(res =>createMurkUp(res)).join('');
    galleryEl.insertAdjacentHTML('beforeend', murkUp)
    if (newApiService.TOTAL_PAGES === newApiService.page) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
          return
      }
    loadMoreBtnEl.removeAttribute("style")
}

function createMurkUp(data) {
  const { webformatURL, tags, likes, views, comments, downloads } = data;
  return `<div class="photo-card">
  <img src=${webformatURL} alt = ${tags} width="340" height="230" loading = "lazy" />
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
