import React, { useContext } from 'react'
import { useState } from "react";
import { DateTime, Info, Interval } from "luxon";
import "./calendar.css";
import { appointments } from "./../App";
import classnames from "classnames"
//import { AppContext } from '../context/AppContext'

const MyAppointments = () => {

  const today = DateTime.local();
  const [activeDay, setActiveDay] = useState(null);
  const [firstDayofActiveMonth, setFirstDayofActiveMonth] = useState(today.startOf("month"));

  // Fix the logic to get the appointments for the selected day.
  const activeDayAppointments = activeDay
    ? appointments[activeDay.toISODate()] ?? []
    : [];

  const weekDays = Info.weekdays("short");
  const daysOfMonth = Interval.fromDateTimes(
    firstDayofActiveMonth.startOf("week"),
    firstDayofActiveMonth.endOf("month").endOf("week")
  ).splitBy({ day: 1 }).map(day => day.start);

  const goToPrevMonth = () => {
    setFirstDayofActiveMonth(firstDayofActiveMonth.minus({ month: 1 }))
  }
  const goToNextMonth = () => {
    setFirstDayofActiveMonth(firstDayofActiveMonth.plus({ month: 1 }))
  }
  const goToToday = () => {
    setFirstDayofActiveMonth(today.startOf('month'))
  }
  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Appointments</h1>
      <br />
      <div className="calendar-container">
        <div className="calendar">
          <div className="calendar-headline">
            <div className="calendar-headline-month">
              {firstDayofActiveMonth.monthShort}, {firstDayofActiveMonth.year}
            </div>
            <div className="calendar-headline-controls">
              <div className="calendar-headline-control" onClick={goToPrevMonth}>←</div>
              <div className="calendar-headline-control calendar-headline-controls-today" onClick={goToToday}>Today</div>
              <div className="calendar-headline-control" onClick={goToNextMonth}>→</div>
            </div>
          </div>
          <div className="calendar-weeks-grid">
            {weekDays.map((weekDay, weekDayIndex) => (
              <div key={weekDayIndex} className="calendar-weeks-grid-cell">{weekDay}</div>
            ))}
          </div>
          <div className="calendar-grid">
            {daysOfMonth.map((dayOfMonth, dayOfMonthIndex) => (
              <div
                key={dayOfMonthIndex}
                className={classnames({
                  'calendar-grid-cell': true,
                  'calendar-grid-cell-inactive': dayOfMonth.month !== firstDayofActiveMonth.month,
                  'calendar-grid-cell-active': activeDay?.toISODate() === dayOfMonth.toISODate(),
                })}
                onClick={() => setActiveDay(dayOfMonth)}
              >
                {dayOfMonth.day}
              </div>
            ))}
          </div>
          <div>
            <div className="schedule">
              <div className="schedule-headline">
                {activeDay === null && <div> Please Select an Active Day </div>}
                {activeDay && <div> {activeDay.toLocaleString(DateTime.DATE_MED)}</div>}
              </div>
              <div>
                {activeDay && activeDayAppointments.length === 0 && (
                  <div> No Appointments for Today! </div>
                )}
                {activeDay && activeDayAppointments.length > 0 && (
                  <>
                    {activeDayAppointments.map((appointment, appointmentIndex) => (
                      <div key={appointmentIndex}>{appointment}</div> //NOT WORKING
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments