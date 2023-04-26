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
