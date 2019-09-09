exports.shoutOutResponse = () => {
  const attachment = JSON.stringify([
    {
      fallback: 'Message from BRAVO',
      callback_id: 'shoutout',
      attachment_type: 'default',
      title: 'Shoutout Options',
      text: 'please select what you would like to do',
      color: '#A9A9A9',
      divider: true,
      actions: [
        {
          name: 'Send a Shoutout',
          text: 'Send a Shoutout',
          type: 'button',
          value: 'give',
          style: 'default',
        },
        {
          name: 'View shoutouts',
          text: 'View shoutouts',
          type: 'button',
          value: 'retrieve',
          style: 'default',
        },
      ],
    },
  ]);
  return attachment;
};

exports.confirmation = text => {
  const attachment = JSON.stringify([
    {
      callback_id: 'submitDialog',
      attachment_type: 'default',
      title: 'Bravo Confirmation:',
      text: `${text}`,
      color: '#A9A9A9',
    },
  ]);
  return attachment;
};

exports.errorALert = text => {
  const attachment = JSON.stringify([
    {
      callback_id: 'submitDialog',
      attachment_type: 'default',
      title: 'Bravo Error:',
      text: `${text}`,
      color: '#A9A9A9',
    },
  ]);
  return attachment;
};

exports.channelNotification = (data, type = null) => {
  let color;
  if (type === 'view') {
    color = '#A9A9A9';
  } else {
    color = '#4265ED';
  }
  const attachment = JSON.stringify([
    {
      callback_id: 'alert message',
      attachment_type: 'default',
      title: 'Shoutout:',
      text: `${data.content}`,
      color: color,
      actions: [
        {
          type: 'button',
          text: 'View',
          url: `${data.clientUrl}/shoutouts/${data.id}`,
        },
      ],
      footer: data.footer,
    },
  ]);
  return attachment;
};
