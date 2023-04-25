const { db } = require('../lib/db');

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const getAllChallenges = async () => {
	return await db.challenge.findMany();
};
module.exports = {
	data: new SlashCommandBuilder().setName('join-quackathon').setDescription('Join a Quackathon'),
	async execute(interaction) {
		try {
			const challenges = await getAllChallenges();
			const availableOptions = [];

			if (challenges.length > 0) {
				challenges.map(challenge => {
					let opt = {
						label: challenge.title,
						description: challenge.description,
						value: challenge.id,
					};

					availableOptions.push(opt);
				});
			} else {
				availableOptions.push({ label: 'No Challenges Currently', description: 'Check back later', value: 0 });
			}

			console.log(challenges);
			const row = new MessageActionRow().addComponents(
				new MessageSelectMenu()
					.setCustomId('join-challenge-select')
					.setPlaceholder('No Quackathon Selected')
					.addOptions(availableOptions),
			);
			const embed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Join A QUACKATHON')
				.setURL('https://discord.gg/FQeJPpzMnZ')
				.setDescription('Select a Quackathon you would like to join.');
			await interaction.reply({
				content: 'Select a Quackathon to join:',
				ephemeral: true,
				embeds: [embed],
				components: [row],
			});
		} catch (error) {
			console.error('AN ERROR', error);
			await interaction.reply({ content: 'An Error Occurred!', ephemeral: true });
		}
	},
};
