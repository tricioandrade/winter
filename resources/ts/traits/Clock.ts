export const Clock = {
    start : function () {
        let clock = document.getElementById('clock')! as HTMLElement;
        let tick = () => {
            const month = this.monthList;

            const h = this.date().getHours();
            const m = this.date().getMinutes();
            const s = this.date().getSeconds();
            const d = this.date().getDate();
            const M = this.date().getMonth();

            const minutes: number | string = m.toString().length === 2 ? m : '0' + m;
            const seconds: number | string = s.toString().length === 2 ? s : '0' + s;
            const day    : number | string = d.toString().length === 2 ? d : '0' + d;

            clock.innerHTML = `
                <i class="fa fa-calendar-alt"></i>
                &nbsp; ${month[M]} ${day} &nbsp;<i class="fa fa-clock"></i> ${h} : ${minutes} : ${seconds}`;
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

export default Clock;
