import { db } from '../lib/db';

async function main() {
	// create users
	console.log('creating users...');
	const keegan = await db.user.create({
		data: { userName: 'Keegan' },
	});
	const auroya = await db.user.create({
		data: { userName: 'Auroya' },
	});
	const rick = await db.user.create({
		data: { userName: 'Rick' },
	});
	console.log('users created!');

	// create a challenge
	console.log('creating challenge...');
	const challenge = await db.challenge.create({
		data: {
			title: 'Discord Bot',
			dueAt: new Date('05-20-2023'),
			minTeam: 2,
			maxTeam: 4,
			description: 'Create a discord bot that does something cool',
			requirements: 'Must be appropriate for the shared server',
		},
	});
	console.log('challenge created!');

	//   form a team
	console.log('creating team...');
	const team = await db.team.create({
		data: {
			name: 'broke dads',
			challengeId: challenge.id,
			members: {
				create: [
					{
						userId: keegan.id,
					},
					{
						userId: auroya.id,
					},
					{
						userId: rick.id,
					},
				],
			},
		},
	});

	console.log('team created!');

	// submitting a project
	console.log('submitting project...');
	const submission = await db.submission.create({
		data: {
			projectName: 'This is the best Project!!!',
			teamId: team.id,
			repoUrl: 'https://www.github.com/auroya/this-is-the-best-project',
			deployedUrl: 'https://www.this-is-the-best-project.com',
		},
	});

	console.log('project submitted!');

	// selecting the winner
	console.log('selecting winner...');
	const winner = await db.submission.update({
		where: { id: submission.id },
		data: { winner: true },
	});
	if (winner && winner.winner) {
		console.log('Broke dads Win!!!');
	} else {
		console.error("Broke dads didn't update as winner");
	}

	// create another challenge
	console.log('creating another challenge...');
	const challenge2 = await db.challenge.create({
		data: {
			title: 'Discord Bot Project 2',
			dueAt: new Date('05-25-2023'),
			minTeam: 1,
			maxTeam: 3,
			description: 'Create a discord bot that does better stuff',
			requirements: 'Everything must be better than the first bot',
		},
	});

	console.log('challenge2 created!');
}
main()
	.then(async () => {
		await db.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await db.$disconnect();
		process.exit(1);
	});
