// Import axios so that we can use it in this module
import axios from 'axios'

const state = {
  testcases: []
}

const getters = {
  testcases () {
    return state.testcases
  }
}

const actions = {
  async FETCH_TC ({commit}, id) {
    try {
      const response = await axios.get(
        'http://localhost:3000/testcases/' + id
      )
      // Send data to mutations to write/give(mutate) data to state
      commit('RECEIVE_TC', {data: response.data})
    } catch (error) {
      console.log(error)
    }
  }
}

const mutations = {
  RECEIVE_TC (state, {data}) {
    // Loop through objects in response data
    for (let testcase of data) {
      // Push objects with custom keys to state
      state.testcases.push({
        time: testcase.meta.time,
        title: testcase.meta.tc.name,
        id: testcase._id,
        status: 'OK',
        data: {
          data1: 'data1',
          data2: 'data2',
          data3: 'data3'
        }
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
