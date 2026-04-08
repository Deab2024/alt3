export async function handler(event, context) {
  const fallbackUrl =
    "https://visiteskilstuna.se/rest-api/rssService/getRssFeed?portletId=12.5b899160171ac5273c72ad9f&pageId=2.369be3c31580a19562d1977e&t=" + Date.now();

  const targetUrl = event.queryStringParameters?.url || fallbackUrl;

  try {
    const response = await fetch(targetUrl);

    if (!response.ok) {
      throw new Error(`RSS-källan svarade med status ${response.status}`);
    }

    const data = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/xml; charset=utf-8",
        "Cache-Control": "no-store"
      },
      body: data
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        error: "Kunde inte hämta RSS-flödet.",
        details: error.message
      })
    };
  }
}
