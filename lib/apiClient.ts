import axios from 'axios'

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

export const correctText = async (text: string) => {
  try {
    const res = await axios.post(`${backendURL}/correct`, { text })
    return res.data
  } catch (err) {
    console.error('Correction API Error:', err)
    return { corrected: text }
  }
}

export const downloadFile = async (fileType: string, content: string) => {
  try {
    const res = await axios.post(`${backendURL}/download`, { fileType, content }, { responseType: 'blob' })
    return res.data
  } catch (err) {
    console.error('Download API Error:', err)
    return null
  }
}
