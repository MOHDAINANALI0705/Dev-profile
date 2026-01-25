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
        console.log("Request body:", body);
        const {ID,username,phone,photo,address,joinDate,
             statsprojects, statscontributions,statsstreak,role}= body;

        // if (!phoneNumber || !address ) {
        //     return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
        // }

        const user = await Details.findOneAndUpdate({ id: ID }, {username,phone,photo,address,joinDate,statsprojects,statscontributions,statsstreak,role }, { new: true });

         return NextResponse.json({ message: "User registered successfully. Please check your email to verify your account." }, { status: 201 });
       
    } catch (err) {
        console.error( err);
        return NextResponse.json({ error: "Invalid request" }, { status: 300 });
    }
}