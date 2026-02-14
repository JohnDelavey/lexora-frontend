import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function correctText(text: string) {
  try {
    const response = await axios.post(`${BACKEND_URL}/correct`, { text });
    return response.data;
  } catch (err) {
    console.error('Backend correction error:', err);
    return null;
  }
}

export async function downloadFile(fileType: string, text: string) {
  try {
    const response = await axios.post(`${BACKEND_URL}/download`, { fileType, text }, { responseType: 'blob' });
    return response.data;
  } catch (err) {
    console.error('Download error:', err);
    return null;
  }
}

export async function saveDocument(userId: string, docId: string, content: string) {
  try {
    const response = await axios.post(`${SUPABASE_URL}/rest/v1/documents`, 
      { user_id: userId, doc_id: docId, content }, 
      { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
    );
    return response.data;
  } catch (err) {
    console.error('Supabase save error:', err);
    return null;
  }
}
