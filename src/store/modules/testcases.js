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
  async FETCH_RUN_TCS ({commit}, runid) {
    try {
      const response = await axios.get(
        'http://localhost:3000/testcases/' + runid
      )
      // Send data to mutations to write/give(mutate) data to state
      commit('RECEIVE_RUN_TCS', {data: response.data})
    } catch (error) {
      console.log(error)
    }
  }
}

const mutations = {
  RECEIVE_RUN_TCS (state, {data}) {
    // Empty current array to prevent duplicating
    state.testcases = []
    // Loop through objects in response data
    for (let testcase of data) {
      // Push objects with custom keys to state
      state.testcases.push({
        time: testcase.meta.time,
        date: new Date(testcase.meta.time).toLocaleDateString('de-DE'),
        description: 'This will be the description of this test case.',
        title: testcase.meta.tc.name,
        id: testcase.meta.tc.id,
        parentid: testcase.meta.run.id,
        status: testcase.meta.logLevel,
        data: {}
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
