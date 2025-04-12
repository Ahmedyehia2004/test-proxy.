addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  try {
    const url = new URL(request.url);
    const target = url.searchParams.get('target');
    if (!target) {
      return new Response('Please provide a target URL. Example: ?target=http://example.com', {
        status: 400,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
    const response = await fetch(target, {
      headers: request.headers,
      method: request.method,
      body: request.body
    });
    return new Response(response.body, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
        'Content-Encoding': 'br'
      }
    });
  } catch (error) {
    return new Response('Error: ' + error.message, {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
