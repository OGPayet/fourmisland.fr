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
    incrementCartItemQuantity(state, index, quantity) {
        state.cartItems[index].quantity += quantity;
    },
    setProducts(state, products) {
        state.products = products;
    },
    setFilteredProducts(state, filteredProducts) {
        state.filteredProducts = filteredProducts;
    }
}
  