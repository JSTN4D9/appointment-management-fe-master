import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchAppointmentsByDayAndStaffQuery } from "../../services/api/appointmentsApi";
import { useFetchStaffsQuery } from "../../services/api/staffsApi";
import {
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Container,
  Grid,
  FormControl,
  Fade,
  CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";
import AppointmentCalendar from "../../components/AppointmentCalendar/AppointmentCalendar";
import DaySlider from "../../components/DaySlider";
import ServerAlert from "../../components/ServerAlert/ServerAlert";
import {
  SectionContainer,
  StyledButton,
} from "./BookAppointmentSection.styles";

export default function BookAppointmentSection() {
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  const navigate = useNavigate();

  const { data: staffs, error: staffError } = useFetchStaffsQuery();

  const {
    data: dayAppointments = { results: [] },
    refetch: refetchDayAppointments,
    isLoading: isLoadingAppointments,
    error: appointmentError,
  } = useFetchAppointmentsByDayAndStaffQuery(
    { staffId: selectedStaff, page: 1, limit: 1000 },
    { skip: !selectedStaff }
  );

  // Refetch appointments when selectedDay or selectedStaff changes
  useEffect(() => {
    if (selectedStaff) {
      refetchDayAppointments();
    }
  }, [selectedDay, selectedStaff, refetchDayAppointments]);

  const handleStaffChange = (value) => {
    setSelectedStaff(value);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (time) => {
    setSelectedSlot(time);
  };

  return (
    <SectionContainer id="booking-section">
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h3" align="center" gutterBottom>
              Book an Appointment
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            {staffError ? (
              <ServerAlert keyword="staffs" />
            ) : (
              <FormControl fullWidth required>
                <InputLabel>Preferred Staff</InputLabel>
                <Select
                  label="Preferred Hairdresser"
                  value={selectedStaff}
                  onChange={(e) => handleStaffChange(e.target.value)}
                >
                  {staffs?.results?.map((staff) => (
                    <MenuItem key={staff.id} value={staff.id}>
                      {`${staff.firstName} ${staff.lastName}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Grid>
        </Grid>
        {/* Conditionally render DaySlider and AppointmentCalendar with a fade transition */}
        {selectedStaff && (
          <Fade in={Boolean(selectedStaff)}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <DaySlider
                  currentDay={selectedDay}
                  setCurrentDay={setSelectedDay}
                />
              </Grid>
              <Grid item xs={12}>
                {isLoadingAppointments ? (
                  <CircularProgress />
                ) : appointmentError ? (
                  <ServerAlert keyword="appointments" />
                ) : (
                  <AppointmentCalendar
                    appointments={dayAppointments.results}
                    onSlotSelect={handleSlotSelect}
                    selectedDay={selectedDay}
                    selectedStaff={selectedStaff}
                    initialSlot={
                      selectedSlot ? dayjs(selectedSlot).format("HH:mm") : null
                    }
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <StyledButton
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    navigate("/appointments/create", {
                      state: { selectedSlot, selectedStaff },
                    })
                  }
                  disabled={!selectedSlot || !selectedStaff}
                >
                  Book Now
                </StyledButton>
              </Grid>
            </Grid>
          </Fade>
        )}
      </Container>
    </SectionContainer>
  );
}
