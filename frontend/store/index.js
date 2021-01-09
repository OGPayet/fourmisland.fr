export const state = () => ({
    cartItemNumber: 0,
    cartItems: [],
    products: [],
    filteredProducts: [],
})
  
export const mutations = {
    addCartItemNumber(state, number) {
        state.cartItemNumber += number;
    },
    addCartItem(state, item) {
        state.cartItems.push(item);
    },
    incrementCartItemQuantity(state, index) {
        state.cartItems[index].quantity++;
        state.cartItemNumber++;
    },
    decrementCartItemQuantity(state, index) {
        if (state.cartItems[index].quantity-- == 0) {
            state.cartItems.slice(index);
        } else {
            state.cartItems[index].quantity--;
        }

        state.cartItemNumber--;
    },
    setProducts(state, products) {
        state.products = products;
    },
    setFilteredProducts(state, filteredProducts) {
        state.filteredProducts = filteredProducts;
    }
}
  