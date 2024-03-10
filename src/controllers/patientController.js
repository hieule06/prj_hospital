import patientServices from "../services/patientServices";

const handlePatientAppointment = async (req, res) => {
  try {
    const data = req.body;
    if (data.email && data.doctorId && data.date) {
      let dataDoctors = await patientServices.patientAppointment(data);
      return res.status(200).json({
        errCode: 0,
        errMessage: "ok!",
        dataDoctors,
      });
    } else {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing inputs parameter!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from sever...",
    });
  }
};

const handleVerifyBookAppoinment = async (req, res) => {
  try {
    const data = req.body;
    if (data.token && data.doctorId) {
      let result = await patientServices.postVerifyBookAppoinment(data);
      return res.status(200).json({
        result,
      });
    } else {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing inputs parameter!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// patient-manage
const handleGetDataBookingByDate = async (req, res) => {
  try {
    const data = req.query;
    if (data) {
      const dataBooking = await patientServices.getDataBookingByDate(data);
      return res
        .status(200)
        .json({ errCode: 0, errMessage: "ok!", dataBooking });
    } else {
      return res
        .status(200)
        .json({ errCode: 1, errMessage: "Missing inputs parameter !" });
    }
  } catch (error) {
    console.log(error);
  }
};

const handleUpdateStatusBooking = async (req, res) => {
  try {
    const data = req.body;
    if (data.token && data.doctorId && data.statusBefore && data.statusAfter) {
      let result = await patientServices.updateStatusBooking(data);
      return res.status(200).json({
        result,
      });
    } else {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing inputs parameter!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const handleDeleteBookings = async (req, res) => {
  try {
    const arrId = req.body;
    if (arrId) {
      let result = await patientServices.deleteBookings(arrId);
      return res.status(200).json({
        result,
      });
    } else {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing inputs parameter!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const handleGetAllBookingHadPatients = async (req, res) => {
  try {
    const data = req.query;
    if (data) {
      const dataPatients = await patientServices.getDataBookingHadPatients(
        data
      );
      return res
        .status(200)
        .json({ errCode: 0, errMessage: "ok!", dataPatients });
    } else {
      return res
        .status(200)
        .json({ errCode: 1, errMessage: "Missing inputs parameter !" });
    }
  } catch (error) {
    console.log(error);
  }
};

const handleHistoryPatient = async (req, res) => {
  try {
    const data = req.body;
    if (data) {
      const result = await patientServices.createHistoryPatient(data);
      return res.status(200).json(result);
    } else {
      return res
        .status(200)
        .json({ errCode: 1, errMessage: "Missing inputs parameter !" });
    }
  } catch (error) {
    console.log(error);
  }
};

const handleGetHistoryPatientByIdPatient = async (req, res) => {
  try {
    const idPatient = req.query.idPatient;
    if (idPatient) {
      const dataHistoryPatient =
        await patientServices.getHistoryPatientByIdPatient(idPatient);
      return res
        .status(200)
        .json({ errCode: 0, errMessage: "ok!", dataHistoryPatient });
    } else {
      return res
        .status(200)
        .json({ errCode: 1, errMessage: "Missing inputs parameter !" });
    }
  } catch (error) {
    console.log(error);
  }
};

const handleGetAllPatients = async (req, res) => {
  try {
    const listPatients = await patientServices.getAllPatients();
    if (listPatients) {
      return res
        .status(200)
        .json({ errCode: 0, errMessage: "ok!", listPatients });
    } else {
      return res
        .status(200)
        .json({ errCode: 1, errMessage: "Hasn't data Patients !" });
    }
  } catch (error) {
    console.log(error);
  }
};

const handleCreateBookingReExamination = async (req, res) => {
  try {
    const data = req.body;
    if (data) {
      const result = await patientServices.createBookingReExamination(data);
      return res.status(200).json(result);
    } else {
      return res
        .status(200)
        .json({ errCode: 1, errMessage: "Missing inputs parameter !" });
    }
  } catch (error) {
    console.log(error);
  }
};

const handleGetBookingReExamination = async (req, res) => {
  try {
    const data = req.query;
    if (data) {
      const result = await patientServices.getBookingReExamination(data);
      return res.status(200).json(result);
    } else {
      return res
        .status(200)
        .json({ errCode: 2, errMessage: "dataQuery is Failed !" });
    }
  } catch (error) {
    console.log(error);
  }
};

const handleSendEmailReExamination = async (req, res) => {
  try {
    const data = req.body;
    if (data) {
      const result = await patientServices.sendEmailReExamination(data);
      if (result) {
        return res.status(200).json(result);
      } else {
        return res
          .status(200)
          .json({ errCode: 2, errMessage: "Re-examination is errored !" });
      }
    } else {
      return res
        .status(200)
        .json({ errCode: 2, errMessage: "dataQuery is Failed !" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handlePatientAppointment,
  handleVerifyBookAppoinment,
  handleGetDataBookingByDate,
  handleUpdateStatusBooking,
  handleDeleteBookings,
  handleGetAllBookingHadPatients,
  handleHistoryPatient,
  handleGetHistoryPatientByIdPatient,
  handleGetAllPatients,
  handleCreateBookingReExamination,
  handleGetBookingReExamination,
  handleSendEmailReExamination,
};
