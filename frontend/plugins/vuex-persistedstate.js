import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    key: 'vuex',
    paths: [
      'cartItemNumber', 
      'cartItems', 
      'isPaypalButtonLoaded', 
      'isTransactionCompleted', 
      'payer',
      'isUserLogged',
      'userJwt',
      'userEmail',
      'userId',
      'userUsername',
    ]
  })(store)
}