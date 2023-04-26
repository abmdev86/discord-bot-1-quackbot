import prisma from './client'

interface CreateQuackathon {
    title: string,
    description: string,
    requirements: string,
    dueAt: Date
}

export async function createQuackathon(challenge: CreateQuackathon) {
	return await prisma.challenge.create({
		data: {
			title: challenge.title.trim(),
			description: challenge.description.trim(),
			requirements: challenge.requirements.trim(),
			dueAt: new Date(challenge.dueAt),
		},
	});
    
}

interface CreateProjectTeam {
	projectName: string,
	challengeId: string,
	members: string[],
	winner: boolean,
	isSubmitted: boolean,
}

export async function createProjectTeam(projectTeam: CreateProjectTeam) {
	return await prisma.projectTeam.create({
		data: {
			projectName: projectTeam.projectName.trim(),
			challengeId: projectTeam.challengeId,
			winner: projectTeam.winner,
			isSubmitted: projectTeam.isSubmitted,
			members: {
				create: [
					{ userId: projectTeam.members[0] },
					{ userId: projectTeam.members[1] },
					{ userId: projectTeam.members[2] },
				]
			}
		},
		
	});
}
