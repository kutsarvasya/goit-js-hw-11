import 'regenerator-runtime/runtime';
import axios from 'axios';

export default class NewsApiService {
  constructor() {
    this.TOTAL_PAGES = 1;
    this.PER_PAGE = 40;
    this.BASE_URL = 'https://pixabay.com/api/?'
    this.totalHits = null
    this.searchQuery = '';
    this.page = 1;
  }
  async querySearchImages() {
    const params = new URLSearchParams({
      key: '36255755-2fbf092869753c62ec4fb113a',
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: this.PER_PAGE,
      page: this.page,
    });
      
    const url = this.BASE_URL + params;
    const res = await axios.get(url);
      this.incrementPage();
      this.totalHits = res.data.totalHits
    this.TOTAL_PAGES = Math.ceil(this.totalHits / this.PER_PAGE);
    return res.data;
  }
    
  resetPage() {
    this.page = 1;
  }
    
  incrementPage() {
    this.page += 1;
  }
    
  get query() {
    return this.searchQuery;
  }
    
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
