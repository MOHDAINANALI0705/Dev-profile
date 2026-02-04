import {connect} from "@/src/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/userModel";
import bcrypt from "bcryptjs";
import {sendEmail} from "@/src/helper/mailer"
import Details from "@/src/models/detailsModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
       
        const {username, email, password,confirmPassword} = body;

         if (!username.trim()) {
            return NextResponse.json({ message : "Please enter a username" }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(email)) {
             return NextResponse.json({ message : "Please enter a valid email address" }, { status: 400 });
        }

        if (password.length < 8) {
             return NextResponse.json({ message : "Password must be at least 8 characters" }, { status: 400 });
        }

        if (password !== confirmPassword) {
             return NextResponse.json({ message : "Passwords do not match" }, { status: 400 });
        }
        if (!email || !password) {
            return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
        }

        const user = await User.findOne({email});
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

       const NewUser = new User({
        username,
        email,
        password: hashedPassword,   
        })
const savedUser = await NewUser.save();

        const Detail = new Details({
            id:savedUser._id.toString(),
            username,
            email,
        })
       const savedDetails = Detail.save();
       console.log("User registered:", savedUser);
       // Send verification email
         await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})

         return NextResponse.json({ error: "User registered successfully. Please check your email to verify your account." }, { status: 201 });
       
    } catch (err) {
        console.error( err);
        return NextResponse.json({ error: "Invalid request" }, { status: 300 });
    }
}
