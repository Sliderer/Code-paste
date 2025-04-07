import axios, { HeadersDefaults } from "axios";

class SearchServerAPI {
  private baseURL: string = '';

  constructor() {
    this.baseURL = "http://127.0.0.1:91";
  }

  async search(query: string) {
    let promise = await axios.get(`${this.baseURL}/search?text=${encodeURIComponent(query)}`, {
      withCredentials: true,
    });

    return promise;
  }

}

export default SearchServerAPI;
