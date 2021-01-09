export const state = () => ({
    cartItemNumber: 0,
    cartItems: [],
    products: [],
    filteredProducts: [],
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
    addProductInCart(state, product) {
        state.cartItems.push(product);
    },
    setProducts(state, products) {
        state.products = products;
    },
    setFilteredProducts(state, filteredProducts) {
        state.filteredProducts = filteredProducts;
    }
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
}