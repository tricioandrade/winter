

export const QueryInvoices = (ref: string | number, invoice: any[], key: string = 'name') => {
    return invoice.filter((obj: any) => {
        switch (key) {
            case 'id'  : return obj.id === ref;
            case 'code': return obj.attributes.code === ref;
            case 'name': return obj.attributes.name === ref;
            case 'ref' : return obj.relationships.invoice.data.invoice_ref === ref;
            default:
                return obj.attributes.name === ref;
        }
    });
}
