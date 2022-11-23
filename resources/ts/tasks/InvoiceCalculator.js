



const InvoiceCalculator = ({merchandise_total, commercial_discount, service_total, iva_total, total }) => {

    return {
        merchandise_total: merchandise_total,
        commercial_discount: commercial_discount,
        financial_discount: 0.00,
        postage: 0.00,
        service_total: service_total,
        iva_total: 0,
        advance: 0,
        ecovalue: 0,
        hit: 0,
        total: 0,
    };
}

export default InvoiceCalculator;
