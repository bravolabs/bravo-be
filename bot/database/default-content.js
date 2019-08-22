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
          label: 'Recipient',
          type: 'select',
          name: 'Recipient',
          optional: false,
          data_source: 'users',
        },
        {
          label: 'ShoutOut',
          type: 'textarea',
          name: 'ShoutOut',
          optional: false,
        },
      ],
    }),
  };
};

const shoutIntro = channel_id => {
  return {
    channel: channel_id,
    channel_name: 'directmessage',
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

const formSubmissionMessage = (channel_id, user_name) => {
  return {
    channel: channel_id,
    channel_name: 'directmessage',
    token: process.env.slack_app_token,
    text: 'Successful Form Submission',
    attachments: JSON.stringify([
      {
        fallback: 'You are unable to choose',
        callback_id: 'successful_submission',
        attachment_type: 'default',
        text: `Shoutout sent successfully to @${user_name}`,
        color: '#7ed692',
        divider: true,
      },
    ]),
  };
};

module.exports = {
  dialog,
  shoutIntro,
  formSubmissionMessage,
};
