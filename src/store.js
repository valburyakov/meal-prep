import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import API from '@/api/';

import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes: [],
    user: null,
    isAuthenticated: false,
    userRecipes: []
  },
  mutations: {
    setRecipes(state, payload) {
      state.recipes = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    setUserRecipes(state, payload) {
      state.userRecipes = payload;
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined;
    }
  },
  actions: {
    async getRecipes({ commit }, plan) {
      try {
        let response = await API.getRecipes(plan);
        commit('setRecipes', response.data.hits);
      } catch (error) {
        commit('setRecipes', []);
      }
    },
    userJoin({ commit }, { email, password }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          commit('setUser', user);
          commit('setIsAuthenticated', true);
          router.push('/about');
        })
        .catch(() => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
        });
    },
    userLogin({ commit }, { email, password }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          commit('setUser', user);
          commit('setIsAuthenticated', true);
          router.push('/about');
        })
        .catch(() => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
        });
    },
    userSignOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
          router.push('/');
        })
        .catch(() => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
          router.push('/');
        });
    },
    addRecipe({ state }, payload) {
      firebase
        .database()
        .ref('users')
        .child(state.user.user.uid)
        .push(payload.label);
    },
    getUserRecipes({ state, commit }) {
      return firebase
        .database()
        .ref('users/' + state.user.user.uid)
        .once('value', snapshot => {
          commit('setUserRecipes', snapshot.val());
        });
    }
  }
});
