import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/login", homeController.getLoginPage);
  router.post("/submit-login", homeController.getSubmitLoginPage);
  router.get("/user-page", homeController.getUserPage);
  router.get("/edit-user", homeController.editUser);
  router.post("/put-edit-user", homeController.updateUser);
  router.get("/delete-user", homeController.deleteUser);

  router.post("/api/login", userController.handleUserLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.post("/api/put-edit-user", userController.handleUpdateUser);
  router.get("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/get-regulation", userController.handleGetRegulation);

  router.get("/api/get-data-doctors", doctorController.handleGetDataDoctors);
  router.get("/api/get-all-doctors", doctorController.handleGetAllDoctors);
  router.post(
    "/api/create-infor-doctor",
    doctorController.handleCreateInforDoctor
  );
  router.get("/api/get-infor-doctor", doctorController.handleGetDataDoctor);
  router.post(
    "/put-edit-infor-doctor",
    doctorController.handleUpdateInforDoctor
  );
  router.get(
    "/api/get-detail-doctor-by-id",
    doctorController.handleGetDataDoctorByID
  );
  router.get(
    "/api/get-detail-doctor-by-idSpecialty",
    doctorController.handleGetDataDoctorByIDSpecialty
  );
  router.post(
    "/api/bulk-create-schedule",
    doctorController.handleBulkCreateSchedule
  );
  router.get(
    "/api/get-data-doctor-schedule",
    doctorController.handledataDoctorSchedule
  );

  router.post(
    "/api/patient-book-appointment",
    patientController.handlePatientAppointment
  );

  router.post(
    "/api/verify-book-appoinment",
    patientController.handleVerifyBookAppoinment
  );

  // Router specialty
  router.post(
    "/api/create-new-specialty",
    doctorController.handleCreateSpecialty
  );

  router.post(
    "/api/update-data-specialty",
    doctorController.handleUpdateSpecialty
  );

  router.get(
    "/api/get-all-specialties",
    doctorController.handleGetAllSpecialty
  );

  router.get(
    "/api/get-detail-specialty-by-id",
    doctorController.handleGetDataSpecialtyByID
  );

  // Router handbook
  router.post(
    "/api/create-new-handbook",
    doctorController.handleCreateHandbook
  );

  router.post(
    "/api/update-data-handbook",
    doctorController.handleUpdateHandbook
  );

  router.get("/api/get-all-handbook", doctorController.handleGetAllHandbook);

  router.get(
    "/api/get-detail-handbook-by-id",
    doctorController.handleGetDataHandbookByID
  );

  // Patient Manage

  router.get(
    "/api/get-data-booking-by-date",
    patientController.handleGetDataBookingByDate
  );

  router.post(
    "/api/update-status-booking",
    patientController.handleUpdateStatusBooking
  );

  return app.use("/", router);
};

module.exports = initWebRoutes;
