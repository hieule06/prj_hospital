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

module.exports = {
  handlePatientAppointment,
  handleVerifyBookAppoinment,
  handleGetDataBookingByDate,
  handleUpdateStatusBooking,
};
