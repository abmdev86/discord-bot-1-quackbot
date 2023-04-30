const { db } = require('../lib/db');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, TextInputComponent, MessageActionRow, Client, Intents } = require('discord.js');
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});
module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite-user')
		.setDescription('Allows a member to invite a user to join a team'),
	async execute(interaction) {
		const userId = await interaction.user.id;
		const username = await interaction.user.username;
		const ownerId = await interaction.guild.ownerId;
		console.log('here==>', userId, username);
		// const message = await interaction.fetchReply();

		if (userId) {
			// 	bot.users.fetch('U751486335667273809').then(dm => {
			// 		dm.send('Message to send');
			// 	});
			const user = await client.users.fetch('751486335667273809').catch(() => null);

			if (!user) return interaction.reply('User not found:(');

			console.log('user here!!!====>', user);

			client.on('message', message => {
				if (message.content === 'test') {
					message.author.send('lol');
					message.react('😀');
				}
			});

			// await user.send('message').catch(() => {
			// 	message.channel.send('User has DMs closed or has no mutual servers with the bot:(');
			// });
			await user.send('hello');
		} else {
			await interaction.reply(`Sorry, you are not allowed to do that!`);
		}
	},
};
