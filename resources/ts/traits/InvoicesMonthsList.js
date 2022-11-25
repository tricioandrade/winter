import DateAndTime from "./DateAndTime";


export const InvoicesMonthsList = (invoices) => {

   const safTMonth = document.getElementById('safTMonth');
    const safTDate = document.getElementById('safTDate');
    const safTYear = document.getElementById('safTYear');

    let opt = '';
    let year = '';
    let date = '';

    let optArr = [];
    let yearArr = [];
    let dateArr = [];

    let obj = [];

    let i = 0;

    const isYear = obj.findIndex(object => {
        return object.year === props.attributes.year;
    });

    const isDate = obj.findIndex(object => {
        return object.date === props.attributes.date;
    });

    const isMonth = obj.findIndex(object => {
        return object.month === props.attributes.month_period;
    });

    invoices.map( props => {

        if(!optArr[isMonth]) opt += ` <option value="${props.attributes.month_period}" >${DateAndTime.monthList[props.attributes.month_period]}</option>`;
        if (!yearArr[isYear]) year += `<option value="${props.attributes.year}" >${props.attributes.year}</option>`;
        if(!dateArr[isMonth]) date += `<option value="${props.attributes.date}" >${props.attributes.date}</option>`;

        obj [i] = {
            year: props.attributes.year,
            date: props.attributes.date,
            month: props.attributes.month_period,
        };


        optArr[i] = props.attributes.month_period;
        yearArr[i] = props.attributes.year;
        dateArr[i] = props.attributes.date;

        i++;
    });

    safTMonth.innerHTML = opt;
    safTDate.innerHTML = date;
    safTYear.innerHTML = year;
}
