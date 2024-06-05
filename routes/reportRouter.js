const express = require("express");
const PDFDocument = require("pdfkit");
const User = require("../models/users"); // Assuming you have a User model
const Payment = require("../models/payment"); // Assuming you have a Payment model

const router = express.Router();

router.get("/generate-report", async (req, res) => {
  try {
    const users = await User.find().populate("planDetails"); // Adjust as needed
    const payments = await Payment.find().populate("planId"); // Adjust as needed

    // Create a PDF document
    const doc = new PDFDocument();
    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      let pdfData = Buffer.concat(buffers);
      res
        .writeHead(200, {
          "Content-Length": Buffer.byteLength(pdfData),
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment;filename=report.pdf",
        })
        .end(pdfData);
    });

    // Add report content
    doc.fontSize(20).text("Gym Management Report", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text("Users:", { underline: true });
    users.forEach((user) => {
      doc.text(
        `Name: ${user.name}, Email: ${user.email}, Plan: ${user.planDetails ? user.planDetails.title : "No Plan"}, Status: ${user.planDetails ? user.planDetails.status : "N/A"}`
      );
    });

    doc.addPage().fontSize(14).text("Payments:", { underline: true });
    payments.forEach((payment) => {
      doc.text(
        `Amount: ${payment.amount}, Currency: ${payment.currency}, Status: ${payment.status}, Payment Method: ${payment.paymentMethod}, Plan: ${payment.planId.title}, Date: ${new Date(payment.createdAt).toLocaleDateString()}`
      );
    });

    // Finalize the PDF and end the stream
    doc.end();
  } catch (err) {
    res.status(500).send("Error generating report");
  }
});

module.exports = router;
