import { createQuackathon,/* createProjectTeam, submitProject, createUser */ } from '../functions-without-context';
import { prismaMock } from '../singleton';

test('should create new quackathon', async function () {
	const challenge = {
		id: 'idontknowwhattoputhere',
		minTeam: 2,
		maxTeam: 4,
		title: 'First Quack',
		description: 'first chance to quack',
		requirements: 'do the right thing',
		dueAt: new Date('05-20-2023'),
    createdAt: new Date('04-26-2023'),
    updatedAt: new Date('04-27-2023'),
	};

	prismaMock.challenge.create.mockResolvedValue(challenge);

	await expect(createQuackathon(challenge)).resolves.toEqual({
		id: 'idontknowwhattoputhere',
		minTeam: 2,
		maxTeam: 4,
		title: 'First Quack',
		description: 'first chance to quack',
		requirements: 'do the right thing',
		dueAt: new Date('05-20-2023'),
    createdAt: new Date('04-26-2023'),
    updatedAt: new Date('04-27-2023'),
	});
});

test('should create a new quackathon, then a new project team', async function () {

  const challenge = {
		id: 'idontknowwhattoputhere',
		minTeam: 2,
		maxTeam: 4,
		title: 'First Quack',
		description: 'first chance to quack',
		requirements: 'do the right thing',
		dueAt: new Date('05-20-2023'),
    createdAt: new Date('04-26-2023'),
    updatedAt: new Date('04-27-2023'),
	};

	prismaMock.challenge.create.mockResolvedValue(challenge);

	const projectTeam = {
		id: 'specialprojectid',
    name: 'broke dads',
		challengeId: 'idontknowwhattoputhere',
		members: ['Keegan', 'Auroya', 'Rick'],
		winner: false,
		isSubmitted: false,
	};

	prismaMock.team.create.mockResolvedValue(projectTeam);

	await expect(createProjectTeam(projectTeam)).resolves.toEqual({
		id: 'specialprojectid',
		projectName: 'Quackathon',
		challengeId: 'idontknowwhattoputhere',
		members: ['Keegan', 'Auroya', 'Rick'],
		winner: false,
		isSubmitted: false,
	});
});

// test("should create 3 new users and add them to a new projectTeam", async function () {

//   const user1 = { id: "Keegan" };
//   const user2 = { id: "Auroya" };
//   const user3 = { id: "Rick" };

//   prismaMock.user.create.mockResolvedValue(user1);
//   prismaMock.user.create.mockResolvedValue(user2);
//   prismaMock.user.create.mockResolvedValue(user3);

//   const projectTeam = {
// 		id: 'specialprojectid',
// 		projectName: 'Quackathon',
// 		challengeId: 'idontknowwhattoputhere',
// 		members: ['Keegan', 'Auroya', 'Rick'],
// 		winner: false,
// 		isSubmitted: false,
// 	};

// 	prismaMock.projectTeam.create.mockResolvedValue(projectTeam);

// 	await expect(createProjectTeam(projectTeam)).resolves.toEqual({
// 		id: 'specialprojectid',
// 		projectName: 'Quackathon',
// 		challengeId: 'idontknowwhattoputhere',
// 		members: [user1.id, user2.id, user3.id],
// 		winner: false,
// 		isSubmitted: false,
// 	});

// });

// test('should create a new quackathon, then a new project team, then submit the project', async function () {

//   const challenge = {
//     id: 'idontknowwhattoputhere',
//     minTeam: 2,
//     maxTeam: 4,
//     title: 'First Quack',
//     description: 'first chance to quack',
//     requirements: 'do the right thing',
//     dueAt: new Date('05-20-2023'),
//   };

//   prismaMock.challenge.create.mockResolvedValue(challenge);

//   const projectTeam = {
//     id: 'specialprojectid',
//     projectName: 'Quackathon',
//     challengeId: 'idontknowwhattoputhere',
//     members: ['Keegan', 'Auroya', 'Rick'],
//     winner: false,
//     isSubmitted: false,
//   };

//   prismaMock.projectTeam.create.mockResolvedValue(projectTeam);

//   await expect(submitProject( 'Quackathon', 'Keegan' )).resolves.toEqual({
//     id: 'specialprojectid',
//     projectName: 'Quackathon',
//     challengeId: 'idontknowwhattoputhere',
//     members: ['Keegan', 'Auroya', 'Rick'],
//     winner: false,
//     isSubmitted: true,
//   });
// });