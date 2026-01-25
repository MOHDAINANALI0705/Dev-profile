import {connect} from "@/src/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/userModel";
import { getDatafromToken } from "@/src/helper/getToken";
import Details from "@/src/models/detailsModel";

connect();

export async function POST(request: NextRequest){
    try {
const useId=await getDatafromToken(request)
console.log("User ID",useId);
const user= await Details.findOne({id:useId}).select("-_id");
console.log("User data:",user);
if(!user){
    return NextResponse.json({ message: "User not found" }, { status: 404 });
}
return NextResponse.json({ message: "User data fetched successfully", user }, { status: 200 });
    }
    catch (error: any) {
        return NextResponse.json({ message: "Error fetching user data" + error }, { status: 500 });
    } 
}
        