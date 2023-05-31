export const clock = () => {

    const date = () => new Date();
    const weekdaysList = [ 'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabado'];
    const monthList =    [ 'Janeiro', 'Feveiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    const start = () => {
        
        let tick = () => {
            const month = monthList;

            const h = date().getHours();
            const m = date().getMinutes();
            const s = date().getSeconds();
            const d = date().getDate();
            const M = date().getMonth();

            const minutes: number | string = m.toString().length === 2 ? m : '0' + m;
            const seconds: number | string = s.toString().length === 2 ? s : '0' + s;
            const day    : number | string = d.toString().length === 2 ? d : '0' + d;

            return (
                <>
                    <i className="fa fa-calendar-alt"></i>
                    &nbsp; 
                    {month[M]} {day} &nbsp;<i class="fa fa-clock"></i> ${h} : ${minutes} : ${seconds}
                </>
                )
        };
        setInterval(tick, 1000);
    }

}

export default Clock;
