import {connect} from "@/src/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server";
import Details from "@/src/models/detailsModel";
import User from "@/src/models/userModel";

connect();

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
            { error: "userId is required" },
            { status: 400 }
            );
        }

        const user = await Details.findById(userId).select("-password");
        
        if (!user) {
            return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "User details retrieved successfully", data: user },
            { status: 200 }
        );
        } catch (error) {
        return NextResponse.json(
            { error: "Failed to retrieve user details" },
            { status: 500 }
        );
        }
    }