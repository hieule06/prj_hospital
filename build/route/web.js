"use strict";

var _express = _interopRequireDefault(require("express"));
var _homeController = _interopRequireDefault(require("../controllers/homeController"));
var _userController = _interopRequireDefault(require("../controllers/userController"));
var _doctorController = _interopRequireDefault(require("../controllers/doctorController"));
var _patientController = _interopRequireDefault(require("../controllers/patientController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var initWebRoutes = function initWebRoutes(app) {
  router.get("/", _homeController["default"].getHomePage);
  router.get("/login", _homeController["default"].getLoginPage);
  router.post("/submit-login", _homeController["default"].getSubmitLoginPage);
  router.get("/user-page", _homeController["default"].getUserPage);
  router.get("/edit-user", _homeController["default"].editUser);
  router.post("/put-edit-user", _homeController["default"].updateUser);
  router.get("/delete-user", _homeController["default"].deleteUser);
  router.post("/api/login", _userController["default"].handleUserLogin);
  router.get("/api/get-all-users", _userController["default"].handleGetAllUsers);
  router.post("/api/create-new-user", _userController["default"].handleCreateNewUser);
  router.post("/api/put-edit-user", _userController["default"].handleUpdateUser);
  router.get("/api/delete-user", _userController["default"].handleDeleteUser);
  router.get("/api/get-regulation", _userController["default"].handleGetRegulation);
  router.get("/api/get-data-doctors", _doctorController["default"].handleGetDataDoctors);
  router.get("/api/get-all-doctors", _doctorController["default"].handleGetAllDoctors);
  router.post("/api/create-infor-doctor", _doctorController["default"].handleCreateInforDoctor);
  router.get("/api/get-infor-doctor", _doctorController["default"].handleGetDataDoctor);
  router.post("/put-edit-infor-doctor", _doctorController["default"].handleUpdateInforDoctor);
  router.get("/api/get-detail-doctor-by-id", _doctorController["default"].handleGetDataDoctorByID);
  router.get("/api/get-detail-doctor-by-idSpecialty", _doctorController["default"].handleGetDataDoctorByIDSpecialty);
  router.post("/api/bulk-create-schedule", _doctorController["default"].handleBulkCreateSchedule);
  router.get("/api/get-data-doctor-schedule", _doctorController["default"].handledataDoctorSchedule);
  router.post("/api/patient-book-appointment", _patientController["default"].handlePatientAppointment);
  router.post("/api/verify-book-appoinment", _patientController["default"].handleVerifyBookAppoinment);

  // Router specialty
  router.post("/api/create-new-specialty", _doctorController["default"].handleCreateSpecialty);
  router.post("/api/update-data-specialty", _doctorController["default"].handleUpdateSpecialty);
  router.get("/api/get-all-specialties", _doctorController["default"].handleGetAllSpecialty);
  router.get("/api/get-detail-specialty-by-id", _doctorController["default"].handleGetDataSpecialtyByID);

  // Router handbook
  router.post("/api/create-new-handbook", _doctorController["default"].handleCreateHandbook);
  router.post("/api/update-data-handbook", _doctorController["default"].handleUpdateHandbook);
  router.get("/api/get-all-handbook", _doctorController["default"].handleGetAllHandbook);
  router.get("/api/get-detail-handbook-by-id", _doctorController["default"].handleGetDataHandbookByID);

  // Patient Manage

  router.get("/api/get-data-booking-by-date", _patientController["default"].handleGetDataBookingByDate);
  router.post("/api/update-status-booking", _patientController["default"].handleUpdateStatusBooking);
  return app.use("/", router);
};
module.exports = initWebRoutes;