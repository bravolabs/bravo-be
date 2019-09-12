exports.private = data => {
  const message = {
    channel: data.channel_id,
    user: data.user_id,
    token: data.access_token,
  };
  return message;
};

exports.public = data => {
  const message = {
    channel: data.channel_id,
    text: data.text,
    token: data.access_token,
  };
  return message;
};
