import doctorServices from "../services/doctorServices";

const handleGetDataDoctors = async (req, res) => {
  let limitCount = Number(req.query.limitCount);
  try {
    if (!limitCount) {
      limitCount = 10;
    }
    let dataDoctors = await doctorServices.getDataDoctors(limitCount);
    return res.status(200).json({
      errCode: 0,
      errMessage: "ok!",
      dataDoctors,
    });
  } catch (error) {
    console.log(error);
  }
};

const handleGetAllDoctors = async (req, res) => {
  try {
    let dataDoctors = await doctorServices.getDataDoctors();
    if (dataDoctors) {
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
  }
};

const handleCreateInforDoctor = async (req, res) => {
  try {
    const dataInforDoctor = req.body;
    if (
      dataInforDoctor &&
      dataInforDoctor.contentMarkDown &&
      dataInforDoctor.contentHTML &&
      dataInforDoctor.descriptionDoctor &&
      dataInforDoctor.priceSelect &&
      dataInforDoctor.selectDoctor
    ) {
      const newInforDoctor = await doctorServices.createInforDoctor(
        dataInforDoctor
      );
      return res.status(200).json({ newInforDoctor });
    } else {
      return res
        .status(200)
        .json({ errCode: 1, errMessage: "Missing inputs parameter !" });
    }
  } catch (error) {
    console.log(error);
  }
};

const handleGetDataDoctor = async (req, res) => {
  try {
    const idDoctor = req.query.idDoctor;
    if (idDoctor) {
      const inforDoctor = await doctorServices.getInforDoctor(idDoctor);
      return res
        .status(200)
        .json({ errCode: 0, errMessage: "ok!", inforDoctor });
    } else {
      return res
        .status(200)
        .json({ errCode: 1, errMessage: "Missing inputs parameter !" });
    }
  } catch (error) {
    console.log(error);
  }
};

const handleUpdateInforDoctor = async (req, res) => {
  try {
    const inforDoctor = req.body;
    if (
      inforDoctor &&
      inforDoctor.contentMarkDown &&
      inforDoctor.contentHTML &&
      inforDoctor.descriptionDoctor &&
      inforDoctor.priceSelect &&
      inforDoctor.selectDoctor
    ) {
      const updateInforDoctor = await doctorServices.updateInforDoctor(
        inforDoctor
      );
      return res.status(200).json({ updateInforDoctor });
    } else {
      return res
        .status(200)
        .json({ errCode: 1, errMessage: "Missing inputs parameter !" });
    }
  } catch (error) {
    console.log(error);
  }
};

const handleGetDataDoctorByID = async (req, res) => {
  try {
    const idDoctor = req.query.id;
    if (idDoctor) {
      const dataDoctor = await doctorServices.GetDataDoctorByID(idDoctor);
      return res
        .status(200)
        .json({ errCode: 0, errMessage: "ok!", dataDoctor });
    } else {
      return res
        .status(200)
        .json({ errCode: 1, errMessage: "Missing inputs parameter !" });
    }
  } catch (error) {
    console.log(error);
  }
};

const handleBulkCreateSchedule = async (req, res) => {
  try {
    const dataListSchedule = req.body;
    if (dataListSchedule) {
      const result = await doctorServices.bulkCreateSchedule(dataListSchedule);
      return res.status(200).json({ errCode: 0, errMessage: "ok!", result });
    } else {
      return res
        .status(200)
        .json({ errCode: 1, errMessage: "Missing inputs parameter !" });
    }
  } catch (error) {
    console.log(error);
  }
};

const handledataDoctorSchedule = async (req, res) => {
  try {
    const listParams = req.query;
    if (listParams) {
      const result = await doctorServices.getDataDoctorSchedule(listParams);
      if (result && result.errCode === 2) {
        return res.status(200).json({ ...result });
      }
      return res.status(200).json({ errCode: 0, errMessage: "ok!", result });
    } else {
      return res
        .status(200)
        .json({ errCode: 1, errMessage: "Missing inputs parameter !" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleGetDataDoctors,
  handleGetAllDoctors,
  handleCreateInforDoctor,
  handleGetDataDoctor,
  handleUpdateInforDoctor,
  handleGetDataDoctorByID,
  handleBulkCreateSchedule,
  handledataDoctorSchedule,
};
