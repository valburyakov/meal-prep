import axios from 'axios';

export default {
  getRecipes(plan) {
    return axios.get('https://api.edamam.com/search', {
      params: {
        q: plan,
        app_id: 'c83c0985',
        app_key: '39054c5fc6b17f6064b542cada2ad4b6',
        from: 0,
        to: 9
      }
    });
  }
};
