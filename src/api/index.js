import axios from 'axios';

export default {
  getRecipes(plan) {
    return axios.get('https://api.edamam.com/search', {
      params: {
        q: plan,
        app_id: process.env.VUE_APP_EDAMAM_APP_ID,
        app_key: process.env.VUE_APP_EDAMAM_API_KEY,
        from: 0,
        to: 9
      }
    });
  }
};
