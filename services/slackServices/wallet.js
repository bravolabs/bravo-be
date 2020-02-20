const User = require('../../data/dbModels/users');
const Organization = require('../../data/dbModels/organizations');
const slackComponent = require('../../data/slackComponents');
const { getUserWallet } = require('../wallet');
const { slackModel } = require('../../data/slackModels/slack');
const wallets = require('../../data/dbModels/wallets');

exports.getUserWalletBalance = async reqInfo => {
  try {
    const { user_id, channel_id, team_id } = reqInfo;
    if (!user_id) throw new Error('provide slack userid please');
    const user = await User.readBySlackId(user_id);
    if (!user) throw new Error('user does not exist on the database');
    const wallet = await getUserWallet(user.id);

    const org = await Organization.read(team_id, null);
    const messageConfig = {
      channel_id,
      user_id,
      access_token: org.access_token,
    };

    const message = slackComponent.message.private(messageConfig);
    message.text = `<@${user_id}> requested his wallet count`;
    message.attachments = JSON.stringify([
      {
        callback_id: 'alert message',
        attachment_type: 'default',
        title: 'Wallet:',
        text: `You currently have ${wallet.data.data.amount} bravos in your wallet 🎈`,
        color: '#A9A9A9',
      },
    ]);
    await slackModel.message.postMessage(message);
  } catch (err) {
    console.log(err);
  }
};

exports.getLeaderboardForOrganization = async function(orgId, reqInfo = {}) {
  try {
    const topTen = await wallets.getWalletLeaderboard(orgId, 0, 10);
    if (!topTen) {
      const noLeaderboardText = { leaderboardMessage: 'No wallets found for this organization' };
      message = slackComponent.message.private(reqInfo);
      message.attachments = slackComponent.attachments.leaderboardConfirmation(noLeaderboardText);
      await slackModel.message.postMessage(message);
    }
    const leaderboardText = {
      leaderboardMessage: `Here are the best performers in your workspace: `,
    };
    message = slackComponent.message.private(reqInfo);
    message.attachments = slackComponent.attachments.leaderboardConfirmation(leaderboardText);
    await slackModel.message.postMessage(message);

    topTen.map(async wallet => {
      const data = {
        content: `\n <@${wallet.slack_mem_id}> - ${wallet.wallet} :tada:`,
      };

      const messageList = slackComponent.message.private(reqInfo);
      messageList.attachments = slackComponent.attachments.leaderboardAttachments(data);

      await slackModel.message.postMessage(messageList);
    });
  } catch (err) {
    console.log(err);
  }
};
