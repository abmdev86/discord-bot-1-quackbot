import { createQuackathon } from '../functions-without-context'
import { prismaMock } from '../singleton'

test('should create new quackathon', async function(){
    const challenge = {
        id: "idontknowwhattoputhere",
        minTeam: 2,
        maxTeam: 4,
        title: "First Quack",
        description: "first chance to quack",
        requirements: "do the right thing",
        dueAt: new Date("05-20-2023")
    }

    prismaMock.challenge.create.mockResolvedValue(challenge);

    await expect(createQuackathon(challenge)).resolves.toEqual({
        id: "idontknowwhattoputhere",
        minTeam: 2,
        maxTeam: 4,
        title: "First Quack",
        description: "first chance to quack",
        requirements: "do the right thing",
        dueAt: new Date("05-20-2023")
      })
    })