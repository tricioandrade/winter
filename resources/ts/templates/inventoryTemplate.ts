import InventoryFormAddProduct from "./inventoryFormAddProduct";
import InventoryFormUpdateProduct from "./inventoryFormUpdateProduct";

const _ = `
<div id="inventory-component" class="container animation" >
    <div class="row">
        <search-product></search-product>
    </div>

    <div class="row"  style="height: 80vh; overflow: auto; padding-bottom: 40px">
        ${ InventoryFormAddProduct }
        ${ InventoryFormUpdateProduct}
    </div>
</div>
`;

export default _;
