const User = require('../../data/dbModels/users');
const Organization = require('../../data/dbModels/organizations');
const slackComponent = require('../../data/slackComponents');
const { getUserWallet } = require('../wallet');
const { slackModel } = require('../../data/slackModels/slack');
const wallets = require('../../data/dbModels/wallets');
const users = require('../../data/dbModels/users');

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
        color: '#4265ED',
      },
    ]);
    await slackModel.message.postMessage(message);
  } catch (err) {
    console.log(err);
  }
};

exports.getLeaderboardForOrganization = async function(orgId, reqInfo = {}) {
  try {
    const walletArray = await wallets.getWalletLeaderboard(orgId);
    if (!walletArray) {
      const noLeaderboardText = { leaderboardMessage: 'No wallets found for this organization' };
      message = slackComponent.message.private(reqInfo);
      message.attachments = slackComponent.attachments.confirmation(noLeaderboardText);
      await slackModel.message.postMessage(message);
    }
    const user = await users.readBySlackId(reqInfo.user_id);
    // Searches for the position of user's wallet in the leaderboard array
    let myWallet;
    walletArray.map(wallet => {
      if (user.slack_mem_id === wallet.slack_mem_id) {
        myWallet = wallet;
      }
    });
    const position = walletArray.indexOf(myWallet) + 1;
    const leaderboardText = {
      leaderboardMessage: `You are currently positioned as number ${position} on the leaderboard. Here are the best performers in your workspace: `,
    };
    message = slackComponent.message.private(reqInfo);
    message.attachments = slackComponent.attachments.confirmation(leaderboardText);
    await slackModel.message.postMessage(message);

    const topTen = walletArray.slice(0, 10);
    topTen.map(async wallet => {
      const data = {
        content: `\n <@${wallet.slack_mem_id}> - ${wallet.wallet} :tada:`,
      };

      const messageList = slackComponent.message.private(reqInfo);
      messageList.attachments = slackComponent.attachments.channelNotification(data, 'leaderboard');

      await slackModel.message.postMessage(messageList);
    });
  } catch (err) {
    console.log(err);
  }
};
