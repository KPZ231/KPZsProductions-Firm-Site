// send-email: sends form data to /api/email and returns parsed JSON or throws
export async function sendEmail(data: any) {
  const apiEndpoint = '/api/email';

  const res = await fetch(apiEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const contentType = res.headers.get('content-type') || '';
  let body: any;
  if (contentType.includes('application/json')) {
    body = await res.json();
  } else {
    body = { message: await res.text() };
  }

  if (!res.ok) {
    const msg = body?.message || `Request failed with status ${res.status}`;
    throw new Error(msg);
  }

  return body;
}