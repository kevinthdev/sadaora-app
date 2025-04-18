import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { hashPassword } from '../src/utils/hashPassword';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const stringToBytes = (str:string) => {
    const encoder = new TextEncoder();
    return encoder.encode(str);
}

async function main() {
    const USERS_TO_CREATE : number = parseInt(process.env.USERS_TO_CREATE || '10', 10);
    const PWD_LENGTH : number= 10;

    for (let i = 0; i < USERS_TO_CREATE; i++) {
        const email : string = faker.internet.email();
        const password : string = await hashPassword(faker.internet.password({length: PWD_LENGTH}));

        const user = await prisma.user.create({
            data: {
                email,
                password,
                profile: {
                    create: {
                        name: faker.person.fullName(),
                        headline: faker.person.jobTitle(),
                        bio: faker.lorem.paragraph(),
                        photo: faker.image.avatar() as string,
                        interests: faker.helpers.arrayElements([
                            'coding',
                            'reading',
                            'traveling',
                            'sports',
                            'gaming',
                            'art',
                            'music',
                        ], 2).join(', '),
                    },
                },
            },
        });

        console.log(`Created user: ${user.email}`);
    }

    console.log(`🌱 Successfully seeded ${USERS_TO_CREATE} users with profiles.`);
}

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
