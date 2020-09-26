exports.handler = async () => {
  console.log('CHECK OUT ALL MY MESSAGE');
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/xml',
    },
    body: `
        <Response>
            <Message>I have recieved a text</Message>
        </Response>
    `,
  };
};
