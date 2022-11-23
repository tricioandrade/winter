export const DateAndTime = {
    clock : function () {
        let clock = document.getElementById('clock');
        let tick = () => {
            const weekdays = this.weekdaysList;
            const month = this.monthList;

            this.month = this.monthList[this.date().getMonth()];
            this.day = this.date().getDay();
            this.dateNow = this.date().getDate();
            this.year = this.date().getFullYear();

            const h = this.date().getHours();
            const m = this.date().getMinutes();
            const s = this.date().getSeconds();
            const w = this.date().getDay();
            const d = this.date().getDate();
            const y = this.date().getFullYear();
            const M = this.date().getMonth();

            clock.innerHTML = '<i class="fa fa-calendar-alt"></i>&nbsp;' + month[M] + ', ' + d + ' ' + '&nbsp;<i class="fa fa-clock"></i> ' + h + ':' + m + ':' + s;
        };
        setInterval(tick, 1000);
    },

    date: () => new Date(),
    weekdaysList: [ 'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabado'],
    monthList:    [ 'Janeiro', 'Feveiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    month: null,
    day: null,
    dateNow: null,
    year: null
}

export default DateAndTime;
