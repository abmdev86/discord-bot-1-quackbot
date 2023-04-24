const { db } = require("../lib/db");

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (interaction.isModalSubmit()) {
			// const favoriteColor = interaction.fields.getTextInputValue('favoriteColorInput');
			// console.log(favoriteColor);
			if (interaction.customId === 'myModal') {
				await interaction.reply({ content: 'Your submission was received successfully!' });
			} else if (interaction.customId === 'createQuackathon'){
				console.log("modal submitted...")
				const res1 = await interaction.fields.getTextInputValue('titleInput');
				console.log("res1: ", res1)
				const res2 = await interaction.fields.getTextInputValue('descriptionInput');
				const res3 = await interaction.fields.getTextInputValue('requirementsInput');
				const res4 = await interaction.fields.getTextInputValue('dueAtInput');
				const res5 = await interaction.fields.getTextInputValue('teamSize');
				console.log(res1, res2, res3, res4, res5);

				async function validateDate(date) {
					if (date === /\d{2}-\d{2}-\d{4}/){
						return true;
				} else {
					return false;
				}
			}

				async function validateTeamSize(team) {
					if (team === /[1-9]-[1-9]/){
						return true;
					}
					else if (parseInt(team[0]) > parseInt(team[2])){
						await interaction.reply({content: "Not a valid range. (the min must be less than or equal to the max"});
						return false;
					}
					else {
						return false;
					}
				}

			if (validateDate && validateTeamSize){

				await db.challenge.create({
					data: {
						title: res1.trim(),
						description: res2.trim(),
						requirements: res3.trim(),
						dueAt: new Date(res4),
						minTeam: parseInt([0]),
						maxTeam: parseInt([2])
					}
				})

				await interaction.reply({content: "Quackathon Created!!"});

			} else {
				await interaction.reply({content: "date format must be DD-MM-YYYY and team size must be a range in the format of {number}-{number}"});
				return
			}

				
				
				
			} else {
				await interaction.reply({content: "Quackathon Created!!"});
			}
		}
		if (!interaction.isCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (err) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(err);
		}
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	},
};
