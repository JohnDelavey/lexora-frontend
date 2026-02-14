'use client';
import { useState, useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { correctText, downloadFile, saveDocument } from '../lib/apiClient';
import { v4 as uuidv4 } from 'uuid';

export default function Editor() {
  const [autoMode, setAutoMode] = useState(true);
  const [metrics, setMetrics] = useState({
    grammar: 0,
    clarity: 0,
    punctuation: 0,
    overall: 0,
  });

  const [userId] = useState(() => localStorage.getItem('lexoraUser') || uuidv4());
  const [docId] = useState(uuidv4());

  useEffect(() => {
    localStorage.setItem('lexoraUser', userId);
  }, [userId]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({ placeholder: 'Start typing here…' }),
    ],
    content: '<p>Start typing here…</p>',
    autofocus: true,
    onUpdate: async ({ editor }) => {
      const html = editor.getHTML();
      if (autoMode) {
        const result = await correctText(html);
        if (result?.correctedText) {
          editor.commands.setContent(result.correctedText, false);
          setMetrics(result.metrics || metrics);
        }
      } else {
        // In manual mode, just update metrics without changing text
        const result = await correctText(html);
        if (result?.metrics) setMetrics(result.metrics);
      }

      // Auto-save to Supabase
      await saveDocument(userId, docId, editor.getHTML());
    },
  });

  const handleToggle = () => setAutoMode(!autoMode);

  const handleDownload = async (type: 'pdf' | 'docx' | 'jpeg') => {
    if (!editor) return;
    const html = editor.getHTML();
    const fileBlob = await downloadFile(type, html);
    if (!fileBlob) return;
    const url = window.URL.createObjectURL(new Blob([fileBlob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `LexoraAI.${type}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Lexora AI Writing Studio</h1>
      <button onClick={handleToggle}>
        Mode: {autoMode ? 'Auto ✅' : 'Manual ✍️'}
      </button>
      <EditorContent
        editor={editor}
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          minHeight: '300px',
          marginTop: '10px',
          outline: 'none',
        }}
      />

      <div style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={() => handleDownload('pdf')}>Download PDF</button>
        <button onClick={() => handleDownload('docx')}>Download DOCX</button>
        <button onClick={() => handleDownload('jpeg')}>Download JPEG</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Confidence Metrics:</h3>
        <p>Grammar: {metrics.grammar}% | Clarity: {metrics.clarity}% | Punctuation: {metrics.punctuation}% | Overall: {metrics.overall}%</p>
      </div>
    </div>
  );
}
