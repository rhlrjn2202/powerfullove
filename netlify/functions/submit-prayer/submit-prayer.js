exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Here you would typically save the prayer request to a database
    // For now, we'll just return a success response
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Prayer request received' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to submit prayer request' })
    };
  }
};