const { handleCreateQuackathon, handleJoinQuackathon, handleRegister } = require('../lib/eventHandlers');
/**
 * Calls the events handlers from ./lib/eventHandlers. This script checks for conditions and runs the proper eventHandler function.
 */
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		const command = interaction.client.commands.get(interaction.commandName);

		try {
			//check for the command name.

			// JOIN TEAM

			// if it is a modal
			if (interaction.isModalSubmit()) {
				console.log('modal submitted');
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
					case 'create-team-modal': {
						const fields = interaction.getTextInputValue('teamNameInput');
						console.log(fields);
					}
					default: {
						await interaction.reply({ content: 'Command recieved!!' });
					}
				}
			}

			// if (interaction.isSelectMenu()) {
			// 	console.log('joining...');
			// 	switch (interaction.customId) {
			// 		case 'join-quackathon': {
			// 			await handleJoinQuackathon(interaction);
			// 			return
			// 		}
			// 		case 'register': {
			// 			await handleRegister(interaction);
			// 			return
			// 		}
			// 		default: {
			// 			console.error("something bad happened in is select menu");
			// 		}
			// 	}

			// }

			// todo does this need to be here?
			if (!interaction.isCommand()) return;

			await command.execute(interaction);
		} catch (err) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(err);
		}
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	},
};
