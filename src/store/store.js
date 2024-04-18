import { createStore } from "vuex"

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
    }
})

export default store