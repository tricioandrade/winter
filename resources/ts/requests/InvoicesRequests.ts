import axios from "../api/axios";

class InvoicesRequests {
    static async getAllInvoices () {
        return await axios.get('sales/invoices');
    }

    static async getAllPaidInvoices () {
        return await axios.get('invoice/paid_invoices');
    }

    static async getSingleInvoice (id: number) {
        return await axios.get('invoice/' + id);
    }

    static async getAllInvoicesByDate(date: Date) {
        return await axios.get('invoice/date/' + date);
    }

    static async getAllInvoicesByYear(year: number) {
        return await axios.get('invoice/year/' + year);
    }

    static async getAllInvoicesByUser(userID: number) {
        return await axios.get('invoice/user/' + userID);
    }

    static async getAllInvoicesByCustomer(customerID: number) {
        return await axios.get('invoice/customer/' + customerID);
    }

}

export default InvoicesRequests;
