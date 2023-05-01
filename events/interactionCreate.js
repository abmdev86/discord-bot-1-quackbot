const { getAllChallenges, getChallengeById, createTeam } = require('../lib/dbHandlers');
const {
	handleCreateQuackathon,
	handleJoinQuackathon,
	handleSubmitProject,
	handleRegister,
	handleCreateTeam,
} = require('../lib/eventHandlers');
const { MessageActionRow, MessageSelectMenu, MessageEmbed, TextInputComponent, Modal } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		const command = interaction.client.commands.get(interaction.commandName);

		try {
			if (interaction.commandName === 'create-team') {
				//todo move somewhere else if needed.
				const teamName = interaction.options._hoistedOptions[0].value;
				const select = new MessageSelectMenu()
					.setCustomId('create-team-select')
					.setPlaceholder('Choose a Challenge to join');
				const challenges = await getAllChallenges();
				const selectOptions = [];
				challenges.map(challenge => {
					let challengeAsOption = {
						label: challenge.title,
						description: challenge.description,
						value: challenge.id,
					};
					selectOptions.push(challengeAsOption);
				});
				select.addOptions(selectOptions);
				const row = new MessageActionRow().addComponents(select);
				//await interaction.reply(`Created team ${teamName}`);
				await interaction.reply({ content: teamName, components: [row] });
				return;
			}
			//check for the command name.

			// JOIN TEAM

			// if it is a modal
			if (interaction.isModalSubmit()) {
				// checking modal Id to execute proper event handler and response.
				switch (interaction.customId) {
					case 'myModal': {
						await interaction.reply({ content: 'Your submission was received successfully!' });
						return;
					}
					case 'createQuackathon': {
						await handleCreateQuackathon(interaction);
						return;
					}

					case 'submitProject': {
						await handleSubmitProject(interaction);
						return;
					}
					default: {
						await interaction.reply({ content: 'Command received!!' });
					}
				}
			}

			if (interaction.isSelectMenu()) {
				switch (interaction.customId) {
					case 'join-quackathon': {
						await handleJoinQuackathon(interaction);
						return;
					}
					case 'register': {
						await handleRegister(interaction);
						return;
					}
					case 'create-team-select': {
						await handleCreateTeam(interaction);
						return;
					}

					default: {
						console.error('something bad happened in is select menu');
					}
				}
			}

			if (!interaction.isCommand()) return;

			// need this here for certain commands. create-quackathon does not work without this for example.
			await command.execute(interaction);
		} catch (err) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(err);
			interaction.reply(`Something went wrong: ${err}`);
		}
		//console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	},
};
