/*
set sidebar open or close,and some app setting
 */
let historyRoutes = []
function handleUnique(arr) {
  let newArr = []
  let newArrKeys = new Set()
  arr.forEach(item => {
    if (!newArrKeys.has(item.path)) {
      newArrKeys.add(item.path)
      newArr.push(item)
    }
  })
  return newArr
}

const state = {
  opened: sessionStorage.getItem('open')
    ? sessionStorage.getItem('open')
    : 'false',
  msgIsShow: false,
  showDriver: localStorage.getItem('driver')
    ? localStorage.getItem('driver')
    : 'yes',
  routesHistory: []
}
const mutations = {
  SET_OPENED(state, payload) {
    state.opened = String(payload)
    sessionStorage.setItem('open', payload)
  },
  SET_MSGISOPEN(state) {
    state.msgIsShow = !state.msgIsShow
  },
  SET_DRIVER(state, payload) {
    state.showDriver = payload
    localStorage.setItem('driver', payload)
  },
  SET_ROUTES_HISTORY(state, payload) {
    console.log('payload', payload)
    historyRoutes.unshift(payload)
    historyRoutes = handleUnique(historyRoutes)
    if (historyRoutes.length > 6) {
      historyRoutes = historyRoutes.slice(0, 6)
    }
    console.log('historyRoutes', historyRoutes)
    state.routesHistory = historyRoutes
    localStorage.setItem('routesHistory', historyRoutes)
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
