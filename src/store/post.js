import { createPost } from '@/services/post.service'

const state = () => ({
  posts: [],
  popularPosts: [],
  loading: false,
})

const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },
  setPopularPosts(state, payload) {
    state.popularPosts = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
}

const actions = {
  async createPost({ commit, state }, payload) {
    try {
      const post = await createPost(payload.data)
      console.log(post)
      commit('setLoading', true)
      commit('setPosts', state.push(payload))
    } catch (error) {
      commit('setLoading', false)
    }
  },
}

const getters = {}

export default { state, mutations, actions, getters }
