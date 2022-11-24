import axios from "../api/axios";

class ReceiptRequests {

    static async getTotalSold () {
        return await axios.get('receipt/total/');
    }

    static async getYearTotalSold (year: number) {
        return await axios.get('receipt/total/year' + year);
    }

    static async getMonthTotalSold (month: number) {
        return await axios.get('receipt/total/month/' + month);
    }

    static async getYearTotalSoldProducts (year: number) {
        return await axios.get('receipt/total/year/sold_products' + year);
    }

    static async getMonthTotalSoldProducts (month: number) {
        return await axios.get('receipt/total/month/sold_products/' + month);
    }

    static async getDateTotalSoldProducts(date: Date) {
        return await axios.get('receipt/total/date/sold_products' + date);
    }
}

export default ReceiptRequests;
