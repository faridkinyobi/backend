const responseBody = (statusCode, status, { message, data }, res) => res.status(statusCode).json({
    status,
    message,
    data,
  });

export default responseBody;
