import * as actionTypes from "./shopping-types";

const INITIAL_STATE = {
  products: [
    {
      id: 1,
      brand: "U.S. Polo Assn",
      title: "Men White & Grey Sneakers",
      image:
        "https://image.goat.com/375/attachments/product_template_pictures/images/020/806/444/original/507844_00.png.png",
      isAssured: false,
      mrp: 3000,
      offer: 35,
      sellingPrice: 111111,
      size: "XL",
      idealFor: "Men",
    },
    {
      id: 2,
      brand: "U.S. Polo Assn",
      title: "Men Black Sneakers",
      image:
        "https://image.goat.com/375/attachments/product_template_pictures/images/008/654/831/original/31342_00.png.png",
      isAssured: true,
      mrp: 5499,
      offer: 65,
      sellingPrice: 22222,
      size: "L",
      idealFor: "WoMen",
    },
    {
      id: 3,
      brand: "HIGHLANDER",
      title: "Men White & Green Sneakers",
      image:
        "https://image.goat.com/375/attachments/product_template_pictures/images/021/545/481/original/509480_00.png.png",
      isAssured: true,
      mrp: 1990,
      offer: 55,
      sellingPrice: 333333,
      size: "L",
      idealFor: "Men",
    },
    {
      id: 4,
      brand: "HIGHLANDER",
      title: "Men White Sneakers",
      image:
        "https://image.goat.com/375/attachments/product_template_pictures/images/008/870/353/original/235806_00.png.png",
      isAssured: true,
      mrp: 2999,
      offer: 76,
      sellingPrice: 444444,
      size: "L",
      idealFor: "WoMen",
    },
    {
      id: 5,
      brand: "HIGHLANDER",
      title: "Men Brown Leather Loafers",
      image:
        "https://image.goat.com/375/attachments/product_template_pictures/images/019/804/999/original/488028_00.png.png",
      isAssured: true,
      mrp: 1599,
      offer: 56,
      sellingPrice: 555555,
      size: "XL",
      idealFor: "Men",
    },
    {
      id: 6,
      brand: "Fashion Victim",
      title: "Men Navy Blue Sneakers",
      image:
        "https://image.goat.com/375/attachments/product_template_pictures/images/021/545/501/original/507173_00.png.png",
      isAssured: true,
      mrp: 2625,
      offer: 50,
      sellingPrice: 666666,
      size: "M",
      idealFor: "Men",
    },
    {
      id: 7,
      brand: "Fashion Victim",
      title: "Men Black & White Sneakers",
      image:
        "https://image.goat.com/375/attachments/product_template_pictures/images/010/564/058/original/303229_00.png.png",
      isAssured: true,
      mrp: 2499,
      offer: 73,
      sellingPrice: 777777,
      size: "M",
      idealFor: "Men",
    },
    {
      id: 8,
      brand: "Fashion Victim",
      title: "Men & Women Color Sneakers",
      image:
        "https://image.goat.com/375/attachments/product_template_pictures/images/019/367/662/original/484799_00.png.png",
      isAssured: true,
      mrp: 2199,
      offer: 67,
      sellingPrice: 888888,
      size: "M",
      idealFor: "WoMen",
    },
  ],
  cart: [],
  wishList: [],
  listOfSelectedFilters: [],
  currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // Get Item data from products array
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      // Check if Item is in cart already
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );

      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };

    case actionTypes.ADJUST_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: +action.payload.qty }
            : item
        ),
      };

    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };

    case actionTypes.SORT_ITEM:
      const sortedProducts =
        action.payload.sortOrder === "low"
          ? state.products.sort((a, b) => a.sellingPrice - b.sellingPrice)
          : state.products.sort((a, b) => b.sellingPrice - a.sellingPrice);
      return {
        ...state,
        products: [...sortedProducts],
      };

    case actionTypes.FILTER_ITEM:
      let newFilters = [...state.listOfSelectedFilters];

      if (action.payload.checked) {
        newFilters.push(action.payload.filterProd);
      } else {
        newFilters = state.listOfSelectedFilters.filter(
          (item) => item !== action.payload.filterProd
        );
      }

      const filteredProducts = INITIAL_STATE.products.filter((item) => {
        return (
          newFilters.indexOf(item.idealFor) >= 0 ||
          newFilters.indexOf(item.brand) >= 0 ||
          newFilters.indexOf(item.size) >= 0
        );
      });

      return {
        ...state,
        products:
          newFilters.length > 0 ? filteredProducts : INITIAL_STATE.products,
        listOfSelectedFilters: newFilters,
      };

    case actionTypes.WISH_LIST:
      const wishList = state.products.find(
        (item) => item.id === action.payload.id
      );

      const inWishList = state.wishList.find((item) =>
        item.id === action.payload.id ? true : false
      );

      return {
        ...state,
        wishList: inWishList
          ? state.wishList
              .map((item) =>
                item.id === action.payload.id
                  ? { ...item, qty: item.qty + 0 }
                  : item
              )
              .filter((item) => item.id !== action.payload.id)
          : [wishList, ...state.wishList],
      };

    case actionTypes.REMOVE_WISH_LIST:
      return {
        ...state,
        wishList: state.wishList.filter(
          (item) => item.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
};

export default shopReducer;
