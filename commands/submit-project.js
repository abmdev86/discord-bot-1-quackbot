const { db } = require('../lib/db');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, TextInputComponent, MessageActionRow } = require('discord.js');
const getAllChallenges = async () => {
	return await db.challenge.findMany();
};

module.exports = {
	data: new SlashCommandBuilder().setName('submit-project').setDescription('Allows a member to submit a project'),
	async execute(interaction) {
		const userId = await interaction.user.id;
		const username = await interaction.user.username;
		const ownerId = await interaction.guild.ownerId;
		console.log('here==>', userId, username);
		if (userId) {
			const modal = new Modal().setTitle('Submit Project').setCustomId('submitProject');

			const teamName = new TextInputComponent()
				.setCustomId('teamName')
				.setLabel('What is the name of your team?')
				.setStyle('SHORT');

			// const teamMembers = new TextInputComponent()
			// 	.setCustomId('teamMembers')
			// 	.setLabel('Who is in your team?')
			// 	.setStyle('SHORT');

			const projectURL = new TextInputComponent()
				.setCustomId('projectURL')
				.setLabel('What is the project URL for live demo?')
				.setStyle('SHORT');

			const repoURL = new TextInputComponent()
				.setCustomId('repoURL')
				.setLabel('What is the repo URL?')
				.setStyle('SHORT');

			const firstActionRow = new MessageActionRow().addComponents(teamName);
			// const secondActionRow = new MessageActionRow().addComponents(teamMembers);
			const thirdActionRow = new MessageActionRow().addComponents(projectURL);
			const fourthActionRow = new MessageActionRow().addComponents(repoURL);

			modal.addComponents(firstActionRow,/* secondActionRow,*/ thirdActionRow, fourthActionRow);
			console.log(modal);
			await interaction.showModal(modal);
		} else {
			await interaction.reply(`Sorry, you are not allowed to do that!`);
		}
	},
};
