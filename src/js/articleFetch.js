export default class API {
  static async searchArticles(filterQuery, field) {
    try {
      const response = await fetch(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=${filterQuery}:("${field}")&sort=newest&api-key=NO3NQNNqyVN7OcEhXphFMgmZc1ZGe0l2`
      );
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  static async searchArticlesEurope() {
    try {
      const response = await fetch(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?facet_fields=subsection_name&fq=news_desk%3A(%22Foreign%22)&q=Europe&sort=relevance&api-key=NO3NQNNqyVN7OcEhXphFMgmZc1ZGe0l2`
      );
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  static async topArticles() {
    try {
      const response = await fetch(
        `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=NO3NQNNqyVN7OcEhXphFMgmZc1ZGe0l2`
      );
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
