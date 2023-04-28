const { db } = require('../lib/db');
const { isValidTeamSize, isValidDate } = require('./validators');

/**
 * (async function) that handles the interactionCreate#isModalSubmit#createQuackathon event
 * @param interaction (payload) the payload of the #interactionCreate event.

 */
async function handleCreateQuackathon(interaction) {
	console.log(`creating new Quackathon....`);
	const title = await interaction.fields.getTextInputValue('titleInput');
	const desc = await interaction.fields.getTextInputValue('descriptionInput');
	const requirements = await interaction.fields.getTextInputValue('requirementsInput');
	const dueAt = await interaction.fields.getTextInputValue('dueAtInput');
	const teamSize = await interaction.fields.getTextInputValue('teamSize');

	console.log(`\n TITLE: ${title}`);
	console.log(`\n DESCRIPTION: ${desc}`);
	console.log(`\n REQUIREMENTS: ${requirements}`);
	console.log(`\n DUE_AT: ${dueAt}`);
	console.log(`\n TEAM_SIZE: ${teamSize}`);

	if (isValidDate(dueAt)) {
		try {
			await db.challenge.create({
				data: {
					title: title.trim(),
					description: desc.trim(),
					requirements: requirements.trim(),
					dueAt: new Date(dueAt),
					minTeam: isValidTeamSize(teamSize) ? parseInt(teamSize[0]) : 2,
					maxTeam: isValidTeamSize(teamSize) ? parseInt(teamSize[2]) : 4,
				},
			});
		} catch (error) {
			console.error("challenge was not created", error);
			await interaction.reply({ content: "unable to save to database"});
		}
		

		await interaction.reply({ content: 'Quackathon Created!!' });
	} else {
		await interaction.reply({
			content: 'date format must be DD-MM-YYYY and team size must be a range in the format of {number}-{number}',
		});
		return;
	}
}

async function handleJoinQuackathon(interaction) {
	try {
		//todo update the teams array on the database for Challenges
		const updatedChallenge = await db.challenge.findFirst({
			where: {
				id: interaction.values[0],
			},
		});

		await interaction.update({
			content: `${interaction.user} has joined the challenge ${updatedChallenge.title} `,
			components: [],
		});
	} catch (error) {
		console.error(error);
	}
}
async function handleSubmitProject(interaction) {
	try {
		interaction.reply({ content: 'ok sir, message received' });
		//todo update the teams array on the database for Challenges
		// const updatedChallenge = await db.challenge.findFirst({
		// 	where: {
		// 		id: interaction.values[0],
		// 	},
		// });

		// await interaction.update({
		// 	content: `${interaction.user} has joined the challenge ${updatedChallenge.title} `,
		// 	components: [],
		// });
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	handleCreateQuackathon,
	handleJoinQuackathon,
	handleSubmitProject,
};
