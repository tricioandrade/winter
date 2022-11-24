import {ProductsForSale} from "../interfaces/ProductsForSale";

class ShoppingCartManager {
    private shoppingCart: { products: Partial<ProductsForSale[]>  } = { products: []};

    set addProductToShoppingCart (product: ProductsForSale) {
       const index = this.getProductIndex(product.id);
       // const cartProductID: any | object = this.shoppingCart.products[index];
       if (index) this.shoppingCart.products.splice(index);
       this.shoppingCart.products.push(product);
    }

    get getAllShoppingCartProducts (): object {
       return this.shoppingCart;
    }

    public removeProductsFromShoppingCart(id: number) {
        return this.shoppingCart.products.splice(this.getProductIndex(id));
    }

    private getProductIndex (id: number): number {
        return this.shoppingCart.products.findIndex((object) => {
            return object?.id === id;
        });
    }
}

export default ShoppingCartManager;
