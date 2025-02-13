"use client"
import React, { useEffect, useRef, useState} from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import EditorjsList from '@editorjs/list';
//@ts-ignore
import Checklist from '@editorjs/checklist'
import Paragraph from '@editorjs/paragraph';
import Warning from '@editorjs/warning';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FILE } from '../../dashboard/_components/FileList';

const rawDocument={
    "time" : 1550476186479,
    "blocks" : [{
        data:{
            text: 'Document Name',
            level: 2
        },
        id: "123",
        type: 'header'
    },
    {
        data:{
            level: 4
        },
        id: "1234",
        type: 'header'
    }],
    "version" : "2.8.1"
}

function Editor({onSaveTrigger, field,fileData}:{onSaveTrigger:any, field:any, fileData: FILE}) {
    //@ts-ignore
    const ref=useRef<EditorJS>();
    const updateDocument=useMutation(api.files.updateDocument);
    const [document, setDocument]=useState(rawDocument);
    useEffect(()=>{
        fileData&&initEditor();
    },[fileData])
    useEffect(()=>{
        console.log("trigger value", onSaveTrigger);
        onSaveTrigger&&onSaveDocument();
    },[onSaveTrigger])
    const initEditor=()=>{
        const editor = new EditorJS({
            /**
             * Id of Element that should contain Editor instance
             */
            tools:{
                header: {
                    //@ts-ignore
                    class: Header,
                    shortcut: 'CMD+SHIFT+H',
                    config:{
                        placeholder: 'Enter Header'
                    }
                  },
                  list: {
                    //@ts-ignore
                    class: EditorjsList,
                    inlineToolbar: true,
                    config: {
                      defaultStyle: 'unordered'
                    },
                  },
                  paragraph: {
                    //@ts-ignore
                    class: Paragraph,
                    inlineToolbar: true,
                  },
                  warning: {
                    class: Warning,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+W',
                    config: {
                      titlePlaceholder: 'Title',
                      messagePlaceholder: 'Message',
                    },
                },
            },
            holder: 'editorjs',
            data: fileData?.document?JSON.parse(fileData.document): rawDocument
          });
          ref.current=editor;
    }

    const onSaveDocument=()=>{
        if(ref.current)
        {
            ref.current.save().then((outputData) => {
                console.log('Article data: ', outputData);
                updateDocument({
                    _id:field,
                    document: JSON.stringify(outputData)
                }).then(resp=>{
                        toast('Document Updated!')
                },(e)=>{
                    toast("Server Error!")
                })
              }).catch((error) => {
                console.log('Saving failed: ', error)
              });
        }
    }


  return (
    <div>
        <div id='editorjs' className='ml-20'>
            
        </div>
    </div>
  )
}

export default Editor