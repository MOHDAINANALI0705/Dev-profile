import {connect} from "@/src/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody= await request.json();
        const {email,password}= reqBody;
        const user= await User.findOne({email});
        if(!user){
            return NextResponse.json({message: "User not found"}, {status: 404});
        }  
        const isPasswordCorrect= await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return NextResponse.json({message: "Invalid credentials"}, {status: 401});
        }
        if(!user.isVerified){
            return NextResponse.json({message: "Please verify your email to login"}, {status: 401});
        }
        const tokenData={
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token=await jwt.sign({tokenData}, process.env.TOKEN_SECRET!);
        const response= NextResponse.json({message: "Login successful"}, {status: 200});
        response.cookies.set("authToken", token, {
            httpOnly: true,
            secure: true,
        });
        return response;
    } catch (error:any) {
        return NextResponse.json({message: "Error logging in"+ error}, {status: 500});
    }
}       
