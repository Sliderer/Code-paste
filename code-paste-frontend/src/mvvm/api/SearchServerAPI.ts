import axios, { HeadersDefaults } from "axios";
import { SEARCH_BACKEND_ADDRESS } from "../../config/config";

class SearchServerAPI {
  private baseURL: string = "";

  constructor() {
    this.baseURL = SEARCH_BACKEND_ADDRESS;
  }

  async search(query: string) {
    let promise = await axios.get(
      `${this.baseURL}/search?text=${encodeURIComponent(query)}`,
      {
        withCredentials: true,
      }
    );

    return promise;
  }
}

export default SearchServerAPI;
