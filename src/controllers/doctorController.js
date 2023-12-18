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

module.exports = {
  handleGetDataDoctors,
};
