exports.giveShoutOutDialog = data => {
  const dialog = {
    token: data.access_token,
    trigger_id: data.trigger_id,
    dialog: JSON.stringify({
      title: 'Send Shoutout',
      callback_id: 'shoutout',
      submit_label: 'Send',
      elements: [
        {
          label: 'Who do you want to send a shoutout to?',
          placeholder: 'Choose a person',
          type: 'select',
          name: 'Recipient',
          optional: false,
          data_source: 'users',
        },
        {
          label: 'Shoutout message',
          type: 'textarea',
          name: 'ShoutOut',
          optional: false,
          placeholder: 'Write your shoutout message',
        },
      ],
    }),
  };
  return dialog;
};
