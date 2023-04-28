const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Will register server members and allow create a team'),
	async execute(interaction) {

		try {
		// get user id
		const userId = await interaction.user.id;
		console.log(`${userId} is creating an interaction`);

		const row = new MessageActionRow().addComponents(
			new MessageSelectMenu()
				.setCustomId('register-select')
				.setPlaceholder('register?')
				.addOptions(['yes']),
		);

		const embed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Register')
				.setURL('https://discord.gg/FQeJPpzMnZ')
				.setDescription('Once users register, they can create teams and submit projects');
			await interaction.reply({
				content: 'Register to participate in Quackathons?',
				ephemeral: true,
				embeds: [embed],
				components: [row],
			});
		} catch (error) {
			console.error("Unable to register user");
			await interaction.reply({
				content: "unable to register",
				ephemeral: true,
			});
		}
	}

}