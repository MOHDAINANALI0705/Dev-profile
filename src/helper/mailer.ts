import nodemailer from 'nodemailer';
import User from '../models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email,emailType,userId}:any) =>{
    try {
      const hashedToken = await bcryptjs.hash(userId.toString(),10);
      if(emailType==="VERIFY"){
   const updatedUser= await User.findByIdAndUpdate(userId,{
    $set:{
      verifyToken: hashedToken,verifyTokenExpiry:Date.now()+3600000
    }});
  }else if(emailType==="RESET"){
   const updatedUser = await User.findByIdAndUpdate(userId,{$set:{
    forgotPasswordToken: hashedToken,forgotPasswordExpiry:Date.now()+3600000
  }}
);
  }

 const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure:true,
  port: 465,
  auth: {
  user: process.env.email,
  pass: process.env.password
  }
});

const mailOptions = {
    from: process.env.email,
    to: email,
    subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
    html: `<p>Click here <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}"> here </a> to ${emailType === "VERIFY" ? "Please verify your email address" : "reset your password"} or copy and paste the link below in your browser 
    <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
    </p> `
  };

 const mailResponse= await transport.sendMail( mailOptions);
 return mailResponse
    } catch (error) {
       throw new Error("Email not sent"+error);
    }
}  