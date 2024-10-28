export const API_HOST = process.env.REACT_APP_API

export async function uploadDocument(file: { file: string; name: string; type: string, rootPageId: string }) {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(file),
  }
  
  const res: any = await fetch(`${API_HOST}/upload-document`, options)
  if (!res.ok) {
    throw new Error('Failed to upload the document')
  }
  return await res.json()
}