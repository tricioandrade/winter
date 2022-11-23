import InventoryFormSearchProducts from "./inventoryFormSearchProducts";
import InventoryFormAddProduct from "./inventoryFormAddProduct";
import InventoryFormUpdateProduct from "./inventoryFormUpdateProduct";

const _ = `
<div id="inventory-component" class="container animation" >
    <div class="row">
        ${ InventoryFormSearchProducts }
    </div>

    <div class="row"  style="height: 80vh; overflow: auto; padding-bottom: 40px">
        <div class="row d-flex align-items-stretch pt-3" id="listed_search_product"></div>
        ${ InventoryFormAddProduct }
        ${ InventoryFormUpdateProduct}
    </div>
</div>
`;

export default _;
