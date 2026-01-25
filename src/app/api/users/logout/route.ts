import {connect} from "@/src/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server";


connect();

export async function GET(request: NextRequest) {
    try {
    const response= NextResponse.json({ message: "Logout successful", status: 200 });
response.cookies.set("authToken", "", { httpOnly: true, secure: true, maxAge: 0, expires: new Date(0) });
console.log(response.cookies);
return response;
    }    catch (error: any) {
        return NextResponse.json({ message: "Error logging out" + error }, { status: 500 });
    }
   }