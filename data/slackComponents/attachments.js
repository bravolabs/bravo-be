exports.shoutOutResponse = () => {
  const attachments = JSON.stringify([
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
  return attachments;
};
