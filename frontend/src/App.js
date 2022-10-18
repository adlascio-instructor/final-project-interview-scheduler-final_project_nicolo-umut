import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

import "./App.scss";

import DayList from "./components/DayList";
import Appointment from "./components/Appointment";
// import daysData from "./components/__mocks__/days.json";
import appointmentsData from "./components/__mocks__/appointments.json";
import axios from "axios";
import { Socket } from "socket.io";

export default function Application() {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState({});
  const [appointments, setAppointments] = useState({});

  useEffect(() => {
    axios.get("/interview").then((res) => {
      console.log("get interview", res.data);
      setAppointments(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/available_interview").then((res) => {
      console.log("get available interviewer", res.data);
      setAppointments(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/days").then((res) => {
      console.log("get days data", res.data);
      setDays(res.data);
    });
  }, []);

  // useEffect(() => {
  //   socket.on("cancel-interview", (data) => {
  //     const { appointment_id, day } data;
  //   })
  // })

  function bookInterview(id, interview) {
    console.log(id, interview);
    const isEdit = appointments[id].interview;
    setAppointments((prev) => {
      const appointment = {
        ...prev[id],
        interview: { ...interview },
      };
      const appointments = {
        ...prev,
        [id]: appointment,
      };
      return appointments;
    });
    if (!isEdit) {
      setDays((prev) => {
        const updatedDay = {
          ...prev[day],
          spots: prev[day].spots - 1,
        };
        const days = {
          ...prev,
          [day]: updatedDay,
        };
        return days;
      });
    }
  }
  function cancelInterview(id) {
    setAppointments((prev) => {
      const updatedAppointment = {
        ...prev[id],
        interview: null,
      };
      const appointments = {
        ...prev,
        [id]: updatedAppointment,
      };
      return appointments;
    });
    setDays((prev) => {
      const updatedDay = {
        ...prev[day],
        spots: prev[day].spots + 1,
      };
      const days = {
        ...prev,
        [day]: updatedDay,
      };
      return days;
    });
  }
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} value={day} onChange={setDay} />
        </nav>
      </section>
      <section className="schedule">
        {Object.values(appointments).map((appointment) => (
          <Appointment
            key={appointment.id}
            {...appointment}
            bookInterview={(interview) =>
              bookInterview(appointment.id, interview)
            }
            cancelInterview={cancelInterview}
          />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}


