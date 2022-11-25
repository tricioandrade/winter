

const ProductsTableTemplate = () => {
    const table = `
        <div style="display: none" id="print" class="col-12 row">
                    <div class="quotePrint">
                        <div id="outonoPrintLogo">
                            <div id="invoiceLogo" class="col-12 text-start">
                                <img src="outonologo.jpg" alt="Outono">
                            </div>
                        </div>
                        <span id="clean">
                            <div style="" id="invoiceHeader"></div>
                            <div style="" id="invoiceDetails" class="col-12"></div>
                            <div style="" id="invoiceMiddleInfo" class="col-12"></div>
                            <div class="col-12 saleQuote text-start pl-2">
                                <table class="table product  table-venda productList  scroll-table" id="table-venda">
                                    <thead>
                                        <tr>
                                            <th scope="col" id="code" >Código</th>
                                            <th scope="col">Descrição</th>
                                            <th scope="col">Quantidade</th>
                                            <th scope="col">Preço unitário</th>
                                            <th scope="col">Tx IVA</th>
                                            <th scope="col">Total líquido</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                                <div id="footerInfo"></div>
                            </div>
                        </span>
                    </div>
                </div>
    `;
}
