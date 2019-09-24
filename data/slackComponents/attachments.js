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

exports.confirmation = data => {
  let title;
  let text;
  if (data.leaderboardMessage) {
    title = 'Leaderboard: ';
    text = data.leaderboardMessage;
  } else {
    title = 'Bravo Confirmation: ';
    text = data;
  }
  const attachment = JSON.stringify([
    {
      callback_id: 'submitDialog',
      attachment_type: 'default',
      title: title,
      text: text,
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
  let actions;
  if (type === 'view') {
    color = '#A9A9A9';
    actions = [
      {
        type: 'button',
        text: 'View',
        url: `${data.clientUrl}/shoutout/${data.id}`,
      },
    ];
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
      actions: actions,
      footer: data.footer,
    },
  ]);
  return attachment;
};

exports.leaderboardAttachments = data => {
  const attachment = JSON.stringify([
    {
      callback_id: 'alert message',
      attachment_type: 'default',
      title: `${data.content}`,
      color: '#A9A9A9',
    },
  ]);
  return attachment;
};

exports.onboardingAttachments = () => {
  const attachment = JSON.stringify([
    {
      fallback: 'Bravo Onboarding Message',
      callback: 'installation onboarding',
      attachment_type: 'default',
      text:
        '*How it works?* \n Just type `/bravo` shoutout and I will guide you through the process \n \n  *Our mission:* \n Award your peers with acknowledgments that act like coins/points in Slack when they do awesome things - and never let the acknowledgment of their good work get lost in the shuffle again. \n \n With bravo you will be able to give shoutouts to your team and collegues really easily. Also you will be able to see all the feedback and shoutouts that you get in your dashboard.',
      color: '#4265ED',
    },
  ]);
  return attachment;
};

exports.helpOnboardingAttachments = () => {
  const attachment = JSON.stringify([
    {
      fallback: 'Bravo Onboarding Message',
      callback_id: 'shoutout',
      attachment_type: 'default',
      text: 'Give a shoutout',
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
      ],
    },
    {
      fallback: 'Bravo Onboarding Message',
      callback_id: 'shoutout',
      attachment_type: 'default',
      text: 'View shoutouts of the selected user',
      color: '#A9A9A9',
      divider: true,
      actions: [
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
