import { useState } from 'react';

function Calendar() {
  const [date, setDate] = useState(new Date());

  const getCalendarDays = (date:any) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const lastDayOfLastMonth = new Date(date.getFullYear(),date.getMonth(),0);

    console.log(lastDayOfLastMonth);

    const days = [];
    for (let d = new Date(firstDayOfMonth); d <= lastDayOfMonth; d.setDate(d.getDate() + 1)) {
        days.push(new Date(d));
    }

    const firstDayOfWeek = firstDayOfMonth.getDay();
    let d = new Date(lastDayOfLastMonth);
    for (let i = 0; i < firstDayOfWeek; i++) {
        days.unshift(new Date(d));
        d.setDate(d.getDate() - 1);
    }
    return days;
  };

  const goToPreviousMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {    
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const calendarDays = getCalendarDays(date);
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  const weeks:any = [];
  let week:any = [];

  calendarDays.forEach((day, index) => {
    if (day) {
      week.push(day);
    }

    if (week.length === 7 || index === calendarDays.length - 1) {
      weeks.push(week);
      week = [];
    }
  });


  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={goToPreviousMonth}>&lt;</button>
        <h2>
          {month} {year}
        </h2>
        <button onClick={goToNextMonth}>&gt;</button>
      </div>
      <table className="calendar-table">
        <thead>
          <tr>
            <th className = "sunday">Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th className = "saturday">Sat</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => (
                <td key={dayIndex}>
                  {day && day.getDate()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <style>
      {`
          .calendar-table {
            width: 100%;
            border-collapse: collapse;
          }
          .calendar-table th, .calendar-table td {
            border: 1px solid #000;
            padding: 5px;
            height: 100px;
            text-align: center;
            vertical-align:top;
            width: 14.2857%
          }
          .sunday {
            color: red;
          }
          .saturday {
            color: blue;
          }
        `}
      </style>
    </div>
  );
}

export default Calendar;
