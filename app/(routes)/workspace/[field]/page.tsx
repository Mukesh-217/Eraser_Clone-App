"use client"
import React, { useEffect, useState } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import Editor from '../_components/Editor'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { FILE } from '../../dashboard/_components/FileList'
import Canvas from '../_components/Canvas'


function Workspace({params}:any) {
  
  const [triggerSave, setTriggerSave]=useState(false);
  const convex=useConvex();
  const [fileData, setaFileData]=useState<FILE|any>();

  useEffect(()=>{
    console.log("FILEID",params.field)
    params.field&&getFileData();
  },[])

  const getFileData=async()=>{
    const result=await convex.query(api.files.getFileById,{_id:params.field});
    setaFileData(result);
  }
  return (
    <div>
        <WorkspaceHeader onSave={()=>setTriggerSave(!triggerSave)}/>

        {/* Workspace layout*/}
        <div className='grid grid-cols-1 md:grid-cols-2'>

        <div className='h-screen'>
          <Editor onSaveTrigger={triggerSave}
          field={params.field}
          fileData={fileData}/>
        </div>
        {/*Whitespace/canvas*/}
        <div className='h-screen'>
          <Canvas/>
        </div>
      </div>
    </div>
  )
}

export default Workspace