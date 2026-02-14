const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://your-hf-space-url.hf.space";

export type Metrics = {
  grammar: number;
  clarity: number;
  punctuation: number;
  other?: number;
  overall?: number;
};

export type CorrectionResponse = {
  correctedText: string;
  metrics: Metrics;
};

// -------------------------------
// Correct Text
// -------------------------------
export async function correctText(
  text: string
): Promise<CorrectionResponse> {
  try {
    const res = await fetch(`${BASE_URL}/correct`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(`Backend error: ${msg}`);
    }

    const data: CorrectionResponse = await res.json();
    return data;
  } catch (err) {
    console.error("Error in correctText:", err);
    return { correctedText: text, metrics: { grammar: 0, clarity: 0, punctuation: 0, overall: 0 } };
  }
}

// -------------------------------
// Download File
// -------------------------------
export type DownloadType = "pdf" | "docx" | "jpeg";

export async function downloadFile(
  text: string,
  type: DownloadType = "pdf"
) {
  try {
    const res = await fetch(`${BASE_URL}/download`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, downloadType: type }),
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(`Download error: ${msg}`);
    }

    const blob = await res.blob();
    const filename = `LexoraAI.${type}`;
    const url = window.URL.createObjectURL(blob);

    // Trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Error in downloadFile:", err);
  }
}

// -------------------------------
// Auto/Manual Mode Handler
// -------------------------------
export async function processText(
  text: string,
  autoMode: boolean = true
) {
  if (!text) return { correctedText: "", metrics: { grammar: 0, clarity: 0, punctuation: 0, overall: 0 } };

  if (autoMode) {
    const result = await correctText(text);
    return result;
  } else {
    // Manual mode: return original text with metrics only
    return { correctedText: text, metrics: { grammar: 0, clarity: 0, punctuation: 0, overall: 0 } };
  }
}
