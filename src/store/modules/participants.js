const state = {
  me: {
    id: 1,
    me: true,
    status: 'staring',
  },
  user: {
    id: 8932489,
    name: 'wwwolfie',
    status: 'staring',
  },
}

const mutations = {

}

const actions = {

}

const getters = {
  me: state => state.me,
  user: state => state.user,
}

export default {
  state,
  mutations,
  actions,
  getters
}