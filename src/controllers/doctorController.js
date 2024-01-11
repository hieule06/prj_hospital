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
      inforDoctor.selectDoctor &&
      inforDoctor.specialtySelect
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

const handleGetDataDoctorByIDSpecialty = async (req, res) => {
  try {
    const idSpecialty = req.query.idSpecialty;
    if (idSpecialty) {
      const listDoctors = await doctorServices.GetDataDoctorByIDSpecialty(
        idSpecialty
      );
      return res
        .status(200)
        .json({ errCode: 0, errMessage: "ok!", listDoctors });
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

//Specialty page

const handleCreateSpecialty = async (req, res) => {
  try {
    const dataSpecialty = req.body;
    if (
      dataSpecialty &&
      dataSpecialty.nameSpecialty &&
      dataSpecialty.descriptionHTML &&
      dataSpecialty.descriptionMarkdown &&
      dataSpecialty.imgSpecialty
    ) {
      const newSpecialty = await doctorServices.createNewSpecialty(
        dataSpecialty
      );
      return res.status(200).json({ newSpecialty });
    } else {
      return res
        .status(200)
        .json({ errCode: 1, errMessage: "Missing inputs parameter !" });
    }
  } catch (error) {
    console.log(error);
  }
};

const handleUpdateSpecialty = async (req, res) => {
  try {
    const dataSpecialty = req.body;
    if (
      dataSpecialty &&
      dataSpecialty.nameSpecialty &&
      dataSpecialty.descriptionHTML &&
      dataSpecialty.descriptionMarkdown &&
      dataSpecialty.imgSpecialty
    ) {
      const updateSpecialty = await doctorServices.updateDataSpecialty(
        dataSpecialty
      );
      return res.status(200).json({ updateSpecialty });
    } else {
      return res
        .status(200)
        .json({ errCode: 1, errMessage: "Missing inputs parameter !" });
    }
  } catch (error) {
    console.log(error);
  }
};

const handleGetAllSpecialty = async (req, res) => {
  try {
    let AllSpecialty = await doctorServices.getDataSpecialties();
    if (AllSpecialty) {
      return res.status(200).json({
        errCode: 0,
        errMessage: "ok!",
        AllSpecialty,
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

const handleGetDataSpecialtyByID = async (req, res) => {
  try {
    const idSpecialty = req.query.id;
    if (idSpecialty) {
      const dataSpecialty = await doctorServices.GetDataSpecialtyByID(
        idSpecialty
      );
      return res
        .status(200)
        .json({ errCode: 0, errMessage: "ok!", dataSpecialty });
    } else {
      return res
        .status(200)
        .json({ errCode: 1, errMessage: "Missing inputs parameter !" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Handbook page

const handleCreateHandbook = async (req, res) => {
  try {
    const dataHandbook = req.body;
    if (
      dataHandbook &&
      dataHandbook.nameHandbook &&
      dataHandbook.descriptionHTML &&
      dataHandbook.descriptionMarkdown &&
      dataHandbook.imgHandbook
    ) {
      const newHandbook = await doctorServices.createNewHandbook(dataHandbook);
      return res.status(200).json({ newHandbook });
    } else {
      return res
        .status(200)
        .json({ errCode: 1, errMessage: "Missing inputs parameter !" });
    }
  } catch (error) {
    console.log(error);
  }
};

const handleUpdateHandbook = async (req, res) => {
  try {
    const dataHandbook = req.body;
    if (
      dataHandbook &&
      dataHandbook.nameHandbook &&
      dataHandbook.descriptionHTML &&
      dataHandbook.descriptionMarkdown &&
      dataHandbook.imgHandbook
    ) {
      const updateHandbook = await doctorServices.updateDataHandbook(
        dataHandbook
      );
      return res.status(200).json({ updateHandbook });
    } else {
      return res
        .status(200)
        .json({ errCode: 1, errMessage: "Missing inputs parameter !" });
    }
  } catch (error) {
    console.log(error);
  }
};

const handleGetAllHandbook = async (req, res) => {
  try {
    let AllHandbook = await doctorServices.getDataSpecialties();
    if (AllHandbook) {
      return res.status(200).json({
        errCode: 0,
        errMessage: "ok!",
        AllHandbook,
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
  handleGetDataDoctors,
  handleGetAllDoctors,
  handleCreateInforDoctor,
  handleGetDataDoctor,
  handleUpdateInforDoctor,
  handleGetDataDoctorByID,
  handleGetDataDoctorByIDSpecialty,
  handleBulkCreateSchedule,
  handledataDoctorSchedule,
  handleCreateSpecialty,
  handleUpdateSpecialty,
  handleGetAllSpecialty,
  handleGetDataSpecialtyByID,
  handleCreateHandbook,
  handleUpdateHandbook,
  handleGetAllHandbook,
};
