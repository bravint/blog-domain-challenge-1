const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    const createdUser = await prisma.user.create({
        data: {
            username: 'bravin',
            password: 'niceTry',
            email: 'bravin@mail.com',
        },
    });

    console.log(`users created`, createdUser);

    // Add your code here

    const createdProfile = await prisma.profile.create({
        data: {
            picture: `www.bravin.com/picture`,
            bio: 'I would like to be a dinosaur',
            user: {
                connect: {
                    id: createdUser.id,
                },
            },
        },
    });

    console.log(`profile created`, createdProfile);

    const createdPost = await prisma.post.create({
        data: {
            title: 'becoming a dinosaur',
            content: 'maybe watching jurassic park again might be a good idea',
            user: {
                connect: {
                    id: createdUser.id,
                },
            },
        },
    });

    console.log(`post created`, createdPost);

    const createdComment = await prisma.comment.create({
        data: {
            content: 'test reply',
            user: {
                connect: {
                    id: createdUser.id,
                },
            },
            post: {
                connect: {
                    id: createdPost.id,
                },
            },
        },
    });

    console.log(`comment created`, createdComment);

    // Don't edit any of the code below this line
    process.exit(0);
}

seed().catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
});
