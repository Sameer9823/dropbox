import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import {eq, and, isNull} from 'drizzle-orm'
import { NextRequest, NextResponse } from "next/server";


export async function  GET(request:NextRequest){
   try {
      const {userId} = await auth()
      if(!userId){
         return NextResponse.json({error:"Unauthorized"}, {status: 401})
      }
      const searchParams = request.nextUrl.searchParams
      const queryUserId = searchParams.get('folderId')
      const parentId = searchParams.get('parentId')

      if(!queryUserId || queryUserId !== userId){
         return NextResponse.json({error:"Unauthorized"}, {status: 401});

      }

      let userFiles;
      if(parentId){
          userFiles = await db
            .select()
            .from(files)
            .where(
                and(
                    eq(files.userId, userId),
                    eq(files.parentId, parentId)
                )
            )

      } else {
        userFiles =await db.select().from(files).where(
            and(
                eq(files.userId, userId),
                isNull(files.parentId)
            )
        )
      }
   } catch (error) {
      return NextResponse.json({error:"Failed to fetch files"}, {status: 500})
    
   }
}