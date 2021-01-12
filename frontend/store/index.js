export const state = () => ({
    cartItemNumber: 0,
    cartItems: [],
    products: [],
    filteredProducts: [],
    isPaypalButtonLoaded: false,
    isTransactionCompleted: false,
    payer: {},
    isUserLogged: false,
    userJwt: null,
    userEmail: null,
    userId: null,
    userUsername: null,
})
  
export const mutations = {
    incrementTotalNumberProductsInCart(state) {
        state.cartItemNumber++;
    },
    decrementTotalNumberProductsInCart(state) {
        if (state.cartItemNumber > 0) {
            state.cartItemNumber--;
        }
    },
    incrementInCartProduct(state, index) {
        state.cartItems[index].quantity++;
    },
    decrementInCartProduct(state, index) {
        if ((state.cartItems[index].quantity - 1) <= 0) {
            state.cartItems.splice(index, 1);
        } else {
            state.cartItems[index].quantity--;
        }
    },
    removeProductFromCart(state, index) {
        state.cartItems.slice(index);
    },
    clearCart(state) {
        state.cartItems = [];
        state.cartItemNumber = 0;
    },
    addProductInCart(state, product) {
        state.cartItems.push(product);
    },
    setProducts(state, products) {
        state.products = products;
    },
    setFilteredProducts(state, filteredProducts) {
        state.filteredProducts = filteredProducts;
    },
    isPaypalButtonLoaded(state, value) {
        state.isPaypalButtonLoaded = value;
    },
    isTransactionCompleted(state, value) {
        state.isTransactionCompleted = value;
    },
    setPayer(state, payer) {
        state.payer = payer;
    },
    isUserLogged(state, value) {
        state.isUserLogged = value;
    },
    setUserJwt(state, jwt) {
        state.userJwt = jwt;
    },
    setUserEmail(state, email) {
        state.userEmail = email;
    },
    setUserId(state, id) {
        state.userId = id;
    },
    setUserUsername(state, username) {
        state.userUsername = username;
    },
}

export const actions = {
    incrementProductInCartQuantity({ commit }, index) {
        commit('incrementInCartProduct', index);
        commit('incrementTotalNumberProductsInCart');
    },
    decrementProductInCartQuantity({ commit }, index) {
        commit('decrementInCartProduct', index);
        commit('decrementTotalNumberProductsInCart');
    },
    transactionCompleted({ commit }, payer) {
        commit('setPayer', payer);
        commit('clearCart');
        commit('isTransactionCompleted', true);
    },
    userLogged({ commit }, loginResponse) {
        commit('isUserLogged', true);
        commit('setUserJwt', loginResponse.jwt);
        commit('setUserEmail', loginResponse.user.email);
        commit('setUserId', loginResponse.user.id);
        commit('setUserUsername', loginResponse.user.username);
    },
    logout({ commit }) {
        commit('isUserLogged', false);
        commit('setUserJwt', null);
        commit('setUserEmail', null);
        commit('setUserId', null);
        commit('setUserUsername', null);
    }
}