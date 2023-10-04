import {legacy_createStore as createStore , combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {productsReducer, productDetailsReducer, newProductReducer, delete_updateReducer, newReviewReducer, productReviewsReducer, reviewReducer} from "./Reducers/productReducer";
import {filterReducer, priceAscReducer, priceDescReducer} from "./Reducers/filterReducer";
import {userReducer, profileReducer, allUsersReducer, userDetailsReducer, getUserReducer, resetPasswordReducer} from "./Reducers/userReducer"
import { cartReducer } from "./Reducers/cartReducer";
import {newOrderReducer, myOrdersReducer, orderDetailsReducer, orderPayReducer} from "./Reducers/orderReducer";
import {allOrdersReducer, orderReducer} from "./Reducers/orderReducer"
import {featureReducer} from "./Reducers/featureReducer";
import {categoryReducer, newCategoryReducer, deleteCategoryReducer} from "./Reducers/categoryReducer";



const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    filters: filterReducer,
    user: userReducer,
    profile: profileReducer,
    getuser: getUserReducer,
    resetPassword: resetPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    allOrders: allOrdersReducer,
    allUsers: allUsersReducer,
    newProduct: newProductReducer,
    newReview: newReviewReducer,
    delete_update: delete_updateReducer,
    order: orderReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    features: featureReducer,
    categories: categoryReducer,
    newCategory: newCategoryReducer,
    deleteCategory : deleteCategoryReducer,
    priceAsc: priceAscReducer,
    priceDesc: priceDescReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    }
};

const middleware = [thunk];

const store  = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;