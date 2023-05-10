import 'regenerator-runtime/runtime';
import axios from 'axios';

// const BASE_URL = 'https://pixabay.com/api/?';
// const params = new URLSearchParams({
//   key: '36255755-2fbf092869753c62ec4fb113a',
//   q: '',
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: 'true',
//   per_page: '40',
//   page: '',
// });

// export async function onSearchImages(name, pageNumber) {
//   params.set('q', name);
//   params.set('page', pageNumber);
//   const url = BASE_URL + params;
//   const res = await axios.get(url);
//   return res.data;
// }

export default class NewsApiService {
    constructor() {
    this.TOTAL_PAGES = 1
    this.PER_PAGE=40
    this.searchQuery = '';
    this.page = 1;
  }
  async querySearchImages() {
    const BASE_URL = 'https://pixabay.com/api/?';
    const params = new URLSearchParams({
      key: '36255755-2fbf092869753c62ec4fb113a',
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: this.PER_PAGE,
      page: this.page,
    });
    const url = BASE_URL + params;
      const res = await axios.get(url);
      this.incrementPage()
      this.TOTAL_PAGES = Math.ceil(res.data.totalHits/ this.PER_PAGE)
      console.log(this.TOTAL_PAGES)
    return res.data;
  }
    resetPage() {
        this.page =1
    }
    incrementPage() {
         this.page += 1
    }
    get query() {
        return this.searchQuery
    }
    set query(newQuery) {
        this.searchQuery = newQuery
    } 
}
