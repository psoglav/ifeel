const state = {
  me: {
    id: 1,
    me: true,
    status: 'staring',
    pic: 'https://www.c41magazine.com/wp-content/uploads/2020/05/Thuy-Tran-Mien-Rootless-c41magazine-4.jpg'
  },
  user: {
    id: 8932489,
    name: 'wwwolfie',
    status: 'staring',
    pic: 'https://pm1.narvii.com/7804/c06e4c30b19686739078bc4400aaa3ae3211ff57r1-369-339v2_00.jpg'
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