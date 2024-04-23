import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    state : {
        member : null,
    },
    mutations: {
        setMember(state, member) {
            state.member = member;
        }
    },
    getters: {
        getMember(state) {
            return state.member;
        }
    },
    plugins : [
        createPersistedState({
            paths: ["member"]
        })
    ]
})

export default store