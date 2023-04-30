const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-team')
		.setDescription('Create a team')
		.addStringOption(option => option.setName('input').setDescription('The name of the team').setRequired(true)),

	async execute(interaction) {
		// let challenges = await getAllChallenges();
		// let challenge = null;
		// const dateOptions = { day: 'numeric', month: 'numeric', year: 'numeric' };
		// const currentDate = new Date(Date.now()).toLocaleDateString(undefined, dateOptions);

		// challenges.map(c => {
		// 	if(new Date(Date.now()))
		// })
		// const createTeamEmbed = new MessageEmbed({
		// 	color: '#0099ff',
		// 	title: 'Create a Team',
		// 	url: 'https://discord.gg/FQeJPpzMnZ',
		// 	description: 'Create a team to join the Quackathon Challenges',
		// 	fields: [
		// 		{
		// 			name: 'Select a challenge for the Team',
		// 			value: 'You can choose a challenge to join as well.',
		// 		},
		// 	],
		// });
		// const confirmButton = new MessageButton({
		// 	customId: 'create-team-confirm',
		// 	label: 'Confirm',
		// 	style: 'PRIMARY',
		// });

		// const selectMenu = new MessageSelectMenu()
		// 	.setCustomId('create-team-chal-select')
		// 	.setPlaceholder('Make a selection');
		try {
			await interaction.deferReply();
			// get all the challenges from the database
			//const challenges = await getAllChallenges();

			//holds the available options for the select menu
			//const challengeOptions = [];
			// iterates over the challenges and adds them as options to the challengeOptions array
			// todo (update) check for 'active' challengs.
			// challenges.map(c => {
			// 	let opt = new StringSelectMenuOptionBuilder()
			// 		.setLabel(c.title)
			// 		.setDescription(c.description)
			// 		.setValue(c.id);
			// 	challengeOptions.push(opt);
			// });

			// if there are available challanges, prompt the user to creat a team
			// if (challengeOptions.length > 0) {
			// 	challengeOptions.map(option => {
			// 		let opt = { ...option.data };
			// 		console.log('option: ', opt);
			// 		selectMenu.addOptions(opt);
			// 	});

			// 	const mainRow = new MessageActionRow({
			// 		components: [selectMenu],
			// 	});

			// 	await interaction.reply({
			// 		content: 'Create a Team',

			// 		components: [mainRow],
			// 	});
			// } else {
			// 	// no challenges, no reason to create a team.
			// 	await interaction.reply({
			// 		content: 'There are no Challenges currently running, Try again later',
			// 		ephemeral: true,
			// 	});
			// }
		} catch (error) {
			console.error('AN ERROR', error);
			await interaction.reply({ content: 'An Error Occurred!', ephemeral: true });
		}
	},
};
