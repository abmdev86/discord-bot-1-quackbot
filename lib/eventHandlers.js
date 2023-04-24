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

	if (isValidDate(dueAt) && isValidTeamSize(teamSize)) {
		await db.challenge.create({
			data: {
				title: title.trim(),
				description: desc.trim(),
				requirements: requirements.trim(),
				dueAt: new Date(dueAt),
			},
		});

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
		console.log(interaction);
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	handleCreateQuackathon,
	handleJoinQuackathon,
};
