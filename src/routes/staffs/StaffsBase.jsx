import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useFetchStaffsQuery,
  useUnassignStaffMutation,
} from "../../services/api/staffsApi";
import FadeAlert from "../../components/FadeAlert/FadeAlert";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useMediaQuery } from "@mui/material";

const StaffsBase = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading, isError, refetch } = useFetchStaffsQuery({
    page: 1,
    limit: 10,
  });
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [unassignStaff] = useUnassignStaffMutation();
  const [openDialog, setOpenDialog] = useState(false);
  const [alert, setAlert] = useState(location.state?.alert || null);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  // Refetch staffs when location state changes
  useEffect(() => {
    if (location.state?.alert) {
      setAlert(location.state.alert);
      navigate(location.pathname, { replace: true });
      refetch();
    }
  }, [location, navigate, refetch]);

  const handleEdit = (id) => {
    navigate(`/manage-staffs/edit/${id}`);
  };

  const handleOpenDialog = (staff) => {
    setSelectedStaff(staff);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStaff(null);
  };

  const handleAlertClose = () => {
    setAlert(null); // Remove the alert from the DOM after fade-out
  };

  const handleDelete = async () => {
    if (selectedStaff) {
      try {
        await unassignStaff(selectedStaff.id).unwrap(); // Use unassignStaff

        setOpenDialog(false); // Close the dialog
        refetch(); // Refetch the staffs after deleting

        setAlert({
          message: "Staff unassigned successfully!",
          severity: "success",
        });
      } catch (error) {
        setAlert({
          message: `Error unassigning staff: ${error.message}`,
          severity: "error",
        });
      }
    }
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error loading staff</Typography>;
  }

  const columns = [
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img src={params.value} alt={params.row.firstName} width="50" />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row.id)}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleOpenDialog(params.row)}
          >
            Unassign
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <DashboardLayout>
      {alert && (
        <FadeAlert
          message={alert.message}
          severity={alert.severity}
          duration={3000}
          onClose={handleAlertClose}
        />
      )}
      <Typography variant="h4" gutterBottom>
        Manage Staff
      </Typography>
      <Box sx={{ height: 400, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: isSmallScreen ? "flex-start" : "flex-end",
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/manage-staffs/create")}
          >
            Assign New Staff
          </Button>
        </Box>
        <DataGrid
          rows={data?.results || []}
          columns={columns}
          pageSize={data?.limit || 10}
          rowCount={data?.totalResults || 0}
          paginationMode="server"
          onPageChange={(newPage) => refetch({ page: newPage + 1 })}
          getRowId={(row) => row.id || row._id} // Ensure unique key
        />

        {/* Confirmation Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Unassign Staff"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to unassign {selectedStaff?.firstName}{" "}
              {selectedStaff?.lastName} as a staff?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="secondary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </DashboardLayout>
  );
};

export default StaffsBase;
