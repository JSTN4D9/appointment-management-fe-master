import { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@mui/material";
import dayjs from "dayjs";
import StyledSlot from "./AppointmentCalendar.styles";
import PropTypes from "prop-types";

AppointmentCalendar.propTypes = {
  appointments: PropTypes.array.isRequired,
  onSlotSelect: PropTypes.func.isRequired,
  selectedDay: PropTypes.object.isRequired,
  initialSlot: PropTypes.string,
  selectedStaff: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
};

// Define the days off (e.g., Sunday)
const DAYS_OFF = [0]; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

const slots = [];
// Generate time slots from 10:00 to 18:30
for (let hour = 7; hour <= 18; hour++) {
  for (let minute = 0; minute <= 30; minute += 30) {
    slots.push(
      `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`
    );
  }
}

const isSlotBooked = (time, appointments, selectedDay, selectedStaff) => {
  return appointments.some(
    (appt) =>
      dayjs(appt.appointmentDateTime).isSame(
        dayjs(selectedDay).hour(time.split(":")[0]).minute(time.split(":")[1]),
        "minute"
      ) &&
      appt.preferredHairdresser === selectedStaff &&
      appt.status !== "Cancelled"
  );
};

const isSlotInPast = (time, selectedDay) => {
  const slotDateTime = dayjs(selectedDay)
    .hour(time.split(":")[0])
    .minute(time.split(":")[1]);
  return slotDateTime.isBefore(dayjs());
};

export default function AppointmentCalendar({
  appointments,
  onSlotSelect,
  selectedDay,
  initialSlot,
  selectedStaff,
  readOnly = false,
}) {
  const [selectedSlot, setSelectedSlot] = useState(initialSlot || null);

  // Check if the selected day is a day off
  const isDayOff = DAYS_OFF.includes(selectedDay.day());

  // Reset selectedSlot whenever selectedDay changes, unless the selectedDay matches the day of initialSlot
  useEffect(() => {
    if (initialSlot) {
      const initialSlotDay = dayjs(selectedDay).isSame(dayjs(), "day");
      if (initialSlotDay) {
        setSelectedSlot(initialSlot); // initialSlot is already in HH:mm format
      } else {
        setSelectedSlot(null);
      }
    } else {
      setSelectedSlot(null); // Clear the selectedSlot when selectedStaff changes or initialSlot is not provided
    }
  }, [selectedDay, initialSlot, selectedStaff]);

  // Set initial slot when the component first mounts or when initialSlot changes
  useEffect(() => {
    if (initialSlot) {
      setSelectedSlot(initialSlot); // initialSlot is already in HH:mm format
    }
  }, [initialSlot]);

  const handleSlotClick = (time) => {
    if (
      !readOnly &&
      !isSlotBooked(time, appointments, selectedDay, selectedStaff) &&
      !isSlotInPast(time, selectedDay) &&
      !isDayOff
    ) {
      setSelectedSlot(time);
      onSlotSelect(
        dayjs(selectedDay)
          .hour(time.split(":")[0])
          .minute(time.split(":")[1])
          .toISOString()
      );
    }
  };

  const getSlotStatus = (time) => {
    if (isDayOff) {
      return "Day Off";
    }
    if (isSlotBooked(time, appointments, selectedDay, selectedStaff)) {
      return "Booked";
    }
    if (isSlotInPast(time, selectedDay)) {
      return "Past Slot";
    }
    return "Open Slot";
  };

  return (
    <Grid container spacing={2} mb={2}>
      {slots.map((time) => (
        <Grid item xs={12} sm={6} lg={3} key={time}>
          <StyledSlot
            elevation={3}
            isBooked={isSlotBooked(
              time,
              appointments,
              selectedDay,
              selectedStaff
            )}
            isSelected={selectedSlot === time}
          >
            <Button
              fullWidth
              variant="text"
              onClick={() => handleSlotClick(time)}
              disabled={
                readOnly ||
                isSlotBooked(time, appointments, selectedDay, selectedStaff) ||
                isSlotInPast(time, selectedDay) ||
                isDayOff
              }
            >
              <Typography mr={1} variant="h6">
                {time}
              </Typography>
              <Typography variant="body2">{getSlotStatus(time)}</Typography>
            </Button>
          </StyledSlot>
        </Grid>
      ))}
    </Grid>
  );
}
