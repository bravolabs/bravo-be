const dialog = trigger_id => {
  return {
    token: process.env.slack_app_token,
    trigger_id,
    dialog: JSON.stringify({
      title: 'Send Shoutout',
      callback_id: 'send-shoutout',
      submit_label: 'Submit',
      elements: [
        {
          label: 'Who do you want to send a shoutout to',
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
        },
      ],
    }),
  };
};

const shoutIntro = (channel_id, user) => {
  return {
    channel: channel_id,
    user: user,
    token: process.env.slack_app_token,
    attachments: JSON.stringify([
      {
        fallback: 'You are unable to choose',
        callback_id: 'shoutout_key',
        attachment_type: 'default',
        title: 'Shoutout Options',
        text: 'kindly select an option for your bot task',
        color: '#7ed692',
        divider: true,
        actions: [
          {
            name: 'Give Shoutout',
            text: 'Give Shoutout',
            type: 'button',
            value: 'give',
            style: 'default',
          },
          // {
          //   name: 'Retrieve Shoutouts',
          //   text: 'Retrieve Shoutouts',
          //   type: 'button',
          //   value: 'retrieve',
          //   style: 'default',
          // },
        ],
      },
    ]),
  };
};

const formSubmissionMessage = (channel_id, user_name, content, user_id) => {
  return {
    channel: channel_id,
    user: user_id,
    text: `You have sent a shoutout to <@${user_name}> 🙌🙌`,
    token: process.env.slack_app_token,
    attachments: JSON.stringify([
      {
        callback_id: 'alert message',
        attachment_type: 'default',
        title: 'Shoutout:',
        text: `${content}`,
        color: '#7ed692',
      },
    ]),
  };
};

const channelAlertMessage = (sender_id, recipient_id, content) => {
  return {
    channel: 'bot-test',
    text: `<@${sender_id}> gave a shoutout to <@${recipient_id}>! 🙌🙌`,
    token: process.env.slack_app_token,
    attachments: JSON.stringify([
      {
        callback_id: 'alert message',
        attachment_type: 'default',
        title: 'Shoutout:',
        text: `${content}`,
        color: '#7ed692',
      },
    ]),
  };
};

module.exports = {
  dialog,
  shoutIntro,
  formSubmissionMessage,
  channelAlertMessage,
};
