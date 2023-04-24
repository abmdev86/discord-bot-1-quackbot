const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('join-quackathon').setDescription('Join a Quackathon'),
	async execute(interaction) {
		try {
			const row = new MessageActionRow().addComponents(
				new MessageSelectMenu()
					.setCustomId('join-challenge-select')
					.setPlaceholder('No Quackathon Selected')
					.addOptions([
						{
							label: 'Get Project Name 1',
							description: 'Their description',
							value: 'prisma_challenge_id',
						},
						{
							label: 'Get Project Name 2',
							description: 'Another description',
							value: 'prisma_challenge_id2',
						},
					]),
			);
			const embed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Join A QUACKATHON')
				.setURL('https://discord.js.org/')
				.setDescription('Select a Quackathon you would like to join.');
			await interaction.reply({
				content: 'Select a Quackathon to join:',
				ephemeral: true,
				embeds: [embed],
				components: [row],
			});
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'An Error Occurred!', ephemeral: true });
		}
	},
};
