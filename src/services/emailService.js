"use strict";
import nodemailer from "nodemailer";
require("dotenv").config();

const sendEmailConfirm = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASSWORD_EMAIL,
    },
  });

  let formatEmailSendWhenAskPatientToConfirm = (dataSend) => {
    let mailDetail = "";
    if (dataSend.language === "vi") {
      mailDetail = `
      <h3>Xin chào ${dataSend.patientName}!</h3>
      <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên trang "Đặt Lịch Khám Online"</p>
      <h4>Thông tin lịch khám:</h4>
      <p>Thời gian: ${dataSend.scheduleTimeFrame}</p>
      <p>${dataSend.doctorName}</p>
      <h4>Thông tin khách hàng:</h4>
      <p>Họ và tên: ${dataSend.patientName}</p>
      <p>Số điện thoại: ${dataSend.phoneNumber}</p>
      <p>Địa chỉ: ${dataSend.address}</p>
      <p>Lí do khám: ${dataSend.reason}</p>
      <p>Nếu thông tin trên là đúng, bạn vui lòng ấn vào đường link bên dưới để xác nhận đặt lịch khám!</p>
      <a href=${dataSend.redireactLink} target="_blank">Xác nhận tại đây</a>
      <p>Trân trọng!</p>
      `;
    }
    if (dataSend.language === "en") {
      mailDetail = `
      <h3>Dear ${dataSend.patientName}!</h3>
      <p>You received this email because you booked an online medical appointment on "Đặt Lịch Khám Online"</p>
      <h4>Information on examination schedule:</h4>
      <p>Time: ${dataSend.scheduleTimeFrame}</p>
      <p>${dataSend.doctorName}</p>
      <h4>Customer information:</h4>
      <p>Full name:  ${dataSend.patientName}</p>
      <p>Phone number:  ${dataSend.phoneNumber}</p>
      <p>Address contact:  ${dataSend.address}</p>
      <p>Reason for examination:${dataSend.reason}</p>
      <p>If the above information is correct, please click on the link below to confirm your appointment!</p>
      <a href=${dataSend.redireactLink} target="_blank">Confirm here</a>
      <p>Best regard!</p>
      `;
    }
    return mailDetail;
  };

  // async..await is not allowed in global scope, must use a wrapper
  // send mail with defined transport object
  const sendEmail = await transporter.sendMail({
    from: '"Bệnh viện đa khoa quốc tế Hải Phòng" <hieulebk0609@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: formatEmailSendWhenAskPatientToConfirm(dataSend), // html body
  });
};

const sendEmailReExamination = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASSWORD_EMAIL,
    },
  });

  let formatEmailSendWhenAskPatientToReExamination = (dataSend) => {
    let mailDetail = "";
    if (dataSend.language === "vi") {
      mailDetail = `
      <h3>Xin chào ${dataSend.patientName}!</h3>
      <p>Bạn nhận được thông báo nhắc tái khám từ bệnh viện đa khoa Quốc tế Hải Phòng</p>
      <h4>Thông tin lịch khám:</h4>
      <p>Thời gian tái khám: ${dataSend.currentDate}</p>
      <p>Bạn vui lòng đặt lịch khám vào ngày ${dataSend.currentDate} để có thể tái khám</p>
      <p>Cảm ơn bạn đã lựa chọn dịch vụ của chúng tôi. Chúc bạn một ngày mới tốt lành</p>
      <p>Trân trọng!</p>
      `;
    }
    if (dataSend.language === "en") {
      mailDetail = `
      <h3>Dear ${dataSend.patientName}!</h3>
      <p>Bạn nhận được thông báo nhắc tái khám từ bệnh viện đa khoa Quốc tế Hải Phòng</p>
      <h4>Thông tin lịch khám:</h4>
      <p>Re-examination time: ${dataSend.currentDate}</p>
      <p>Please schedule an examination on ${dataSend.currentDate} so you can have a follow-up examination</p>
      <p>Cảm ơn bạn đã lựa chọn chúng tôi. Chúc bạn một ngày mới tốt lành</p>
      <p>Trân trọng!</p>
      <p>Best regard!</p>
      `;
    }
    return mailDetail;
  };

  // async..await is not allowed in global scope, must use a wrapper
  // send mail with defined transport object
  const sendEmail = await transporter.sendMail({
    from: '"Bệnh viện đa khoa quốc tế Hải Phòng" <hieulebk0609@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông báo nhắc lịch tái khám", // Subject line
    html: formatEmailSendWhenAskPatientToReExamination(dataSend), // html body
  });
};

module.exports = {
  sendEmailConfirm,
  sendEmailReExamination,
};
