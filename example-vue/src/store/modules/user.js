const state = {
    user: ""
};

const getters = {
    getUserStatus: state => !!state.user
};

//Mutations Must Be Synchronous
const mutations = {
    setUser: (state, user) => {
        state.user = user
    }
};

const actions = {
    updateUserStatus: ({ commit }, payload) => {
        commit('setUser', payload.user)
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}