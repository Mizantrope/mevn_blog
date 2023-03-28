import { register, login, me } from '@/services/auth.service'

const state = () => ({
  user: null,
  token: null,
  isLoading: false,
  status: null,
  authenticate: false,
})

const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setToken(state, payload) {
    state.token = payload
  },
  setLoading(state, payload) {
    state.isLoading = payload
  },
  setStatus(state, payload) {
    state.status = payload
  },
  setAuth(state, payload) {
    state.authenticate = payload
  },
}

const actions = {
  async auth({ commit }, { data, template }) {
    try {
      let user = ''
      if (template == 'register') {
        user = await register(data)
      } else {
        user = await login(data)
      }

      localStorage.setItem('token', user.data.token)

      commit('setLoading', true)
      commit('setStatus', user.data.message)
      commit('setUser', user.data.user)
      commit('setToken', user.data.token)
      commit('setAuth', true)
      commit('setLoading', false)
    } catch (err) {
      commit('setStatus', err)
      commit('setLoading', false)
    }
  },

  async me({ commit }) {
    try {
      const user = await me()

      commit('setLoading', false)
      commit('setStatus', null)

      if (user.data.token || user.data.user) {
        commit('setUser', user.data?.user)
        commit('setToken', user.data?.token)
        commit('setAuth', true)
      }
    } catch (err) {
      commit('setStatus', err)
      commit('setLoading', false)
    }
  },

  logout({ commit }) {
    try {
      localStorage.removeItem('token')
      commit('setLoading', false)
      commit('setStatus', null)
      commit('setUser', null)
      commit('setToken', null)
      commit('setAuth', false)
    } catch (err) {
      commit('setStatus', err)
      commit('setLoading', false)
    }
  },
}

const getters = {
  user: ({ user }) => user,
  token: ({ token }) => token,
  isLoading: ({ isLoading }) => isLoading,
  status: ({ status }) => status,
  authenticate: ({ authenticate }) => authenticate,
}

export default { state, mutations, actions, getters }
