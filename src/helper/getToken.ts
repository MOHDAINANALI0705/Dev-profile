import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDatafromToken = (request: NextRequest): string | null => {
    try{
    const Token = request.cookies.get("authToken")?.value || null;
    console.log("Retrieved Token from request:", Token);
    const decodedToken:any = jwt.verify(Token!, process.env.TOKEN_SECRET!);  
    console.log("Decoded Token:", decodedToken);
    return decodedToken.tokenData.id;
    } catch (error) {
        console.error("Error retrieving token from request:", error);
        return null;
    }      
};