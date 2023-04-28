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

		console.log("creating messgae row...");
		
		const row = new MessageActionRow().addComponents(
			new MessageSelectMenu()
				.setCustomId('register')
				.setPlaceholder('register?')
				.addOptions([{label: "yes", description: "register to participate", value: "hi"}]),
		);

		console.log("creating message embed...");

		const embed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Register')
				.setDescription('Once users register, they can create teams and submit projects');

		await interaction.reply({
				content: 'Register to participate in Quackathons?',
				ephemeral: true,
				embeds: [embed],
				components: [row],
			});

		} catch (error) {
			console.error("Unable to register user", error);
			await interaction.reply({
				content: "unable to register",
				ephemeral: true,
			});
		}
	}

}