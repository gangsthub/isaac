import Vuex from 'vuex'

const store = () => {
  return new Vuex.Store({
    state: {
      isMobile: true,
      drawerOpen: true,
    },
    getters: {
      isMobile(state) {
        return state.isMobile
      },
      drawerOpen(state) {
        return state.drawerOpen
      },
    },
    mutations: {
      SET_IS_MOBILE(state, val) {
        state.isMobile = val
      },
      SWITCH_DRAWER(state) {
        state.drawerOpen = !state.drawerOpen
      },
      UPDATE_DRAWER(state, val) {
        state.drawerOpen = val
      },
    },
    actions: {
      // drawer
      switchDrawer({ commit }) {
        commit('SWITCH_DRAWER')
      },
      updateDrawer({ commit }, val) {
        commit('UPDATE_DRAWER', val)
      },
    }
  })
}

export default store
