'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { useState, useEffect } from 'react'
import { correctText } from '../lib/apiClient'

export default function EditorComponent() {
  const [loading, setLoading] = useState(false)
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({ placeholder: 'Type your text here...' }),
    ],
    content: '',
    onUpdate: async ({ editor }) => {
      setLoading(true)
      const text = editor.getText()
      const result = await correctText(text)
      if(result.corrected){
        editor.commands.setContent(result.corrected)
      }
      setLoading(false)
    },
  })

  return (
    <div>
      {loading && <div style={{color:'orange'}}>Correcting...</div>}
      <EditorContent editor={editor} />
    </div>
  )
}
