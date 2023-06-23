import React, { useEffect, useState } from "react";

export const Clock = () => {

    const date = () => new Date();
    // const weekdaysList = [ 'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabado'];
    const monthList =    [ 'Janeiro', 'Feveiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    const [day,         setDay] = useState<number>(date().getDate());
    const [hours,     setHours] = useState<number>(date().getHours());
    const [minutes,   setMinutes] = useState<number>(date().getMinutes());
    const [seconds, setSeconds] = useState<number>(0);
    
    const d = date().getDate();
    const h = date().getHours();
    const m = date().getMinutes();
    const s = date().getSeconds();
    const M = date().getMonth();
    const month = monthList;
    
    
    setInterval(() => {
        setSeconds(s);
    }, 1000);

    useEffect(() => {
        setDay(d);
        setHours(h);
        setMinutes(m);
    }, [seconds])

    return (
            <>
            <i className="fa fa-calendar-alt"></i>&nbsp; 
            { month[M]} 
            { day.toString().length === 2 ? day : '0' + day } &nbsp;<i className="fa fa-clock"></i> 
            { hours.toString().length === 2 ? hours : '0' + hours } :
            { minutes.toString().length === 2 ? minutes : '0' + minutes } : 
            {/* { seconds.toString().length === 2 ? seconds : '0' + seconds } */}
            </>
        );
    }

export default Clock;

