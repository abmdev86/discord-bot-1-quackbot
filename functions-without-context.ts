import prisma from './client'

type CreateQuackathonArgs = {
    title: string,
    description: string,
    requirements: string,
    dueAt: Date
}

export async function createQuackathon<CreateQuackathonArgs>(title, description, requirements, dueAt) {
	await prisma.challenge.create({
		data: {
			title: title.trim(),
			description: description.trim(),
			requirements: requirements.trim(),
			dueAt: new Date(dueAt),
		},
	});
}
