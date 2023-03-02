class AviasalesService {
  _apiBase = 'https://aviasales-test-api.kata.academy/';

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error('Yps!!!!!!!!');
    }
    return await res.json();
  };

  getSearchId = async () => {
    const res = await this.getResource('search');
    return res.searchId;
  };

  getTicket = async (searchId) => {
    const res = await this.getResource(`tickets/?searchId=${searchId}`);
    return res;
  };
}
const aviasalesService = new AviasalesService();

export default aviasalesService;
