import { specslist, specscount } from '../../utils/http'

let state = {
    //列表
    list: [],
    //总数
    total: 0,
    //一页的数量
    size: 2,
    //当前的页码
    page: 1
}

let mutations = {
    changelist(state, arr) {
        state.list = arr
    },
    changetotle(state, num) {
        state.total = num
    },
    changepage(state, num) {
        state.page = num
    }

}

let getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    }
}

let actions = {
    reqlist(context, bool) {
        let params = bool ? {} : { page: context.state.page, size: context.state.size }
        specslist(params).then(res => {
            if (res.data.code == 200) {
                //删除最后一页最后一个
                if (res.data.list.length == 0 && context.state.page > 1) {
                    context.commit('changepage', context.state.page - 1)
                    context.dispatch('reqlist')
                    return;
                }

                let list = res.data.list
                list.forEach(item => {
                    item.attrs = JSON.parse(item.attrs)
                })

                context.commit('changelist', list)
            }
        })
    },
    reqtotal(context) {
        specscount().then(res => {
            if (res.data.code == 200) {
                context.commit('changetotle', res.data.list[0].total)
            }
        })
    },

    //修改page
    changePage(context, num) {
        context.commit('changepage', num)

        context.dispatch('reqlist')
    }

}

export default {
    state, mutations, getters, actions, namespaced: true
}