const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    const createdUsers = await prisma.user.createMany({
        data: [
            { username: 'marian1',
              email: "me@me.com"}, 
            { username: 'alicemart',
            email: "you@you.com"}              
        ]
    });

    console.log(`${createdUsers.count} users created`, createdUsers);

    // Add your code here

    const user1 = await prisma.user.findUnique({
        where: {
          id: 1,
        },
      })

      const user2 = await prisma.user.findUnique({
        where: {
          id: 2,
        },
      })

    const createProfile1 = await prisma.profile.create({
        data: {
            imgURL: "pic.com",
            bio: "This is my bio",
            hobbies: "Surfing",
            userId: user1.id
        }
    })
    const createProfile2 = await prisma.profile.create({
        data: {
            imgURL: "anotherpic.com",
            bio: "This is my bio for the seoncd person",
            hobbies: "Crying at my computer",
            userId: user2.id
        }
    })

    const createPost = await prisma.post.createMany({
        data: [{
            title: "This is a blog post",
            content: "This is the contents of this very exciting blog",
            imgURL: "postpic.com",
            published: true,
            profileId: createProfile1.id
        },
        {
            title: "This is a another blog post",
            content: "Poopy poopy poopyn ppoooopy poooooooo",
            profileId: createProfile1.id
        },
        {
            title: "WTF Prisma",
            content: "I'm finding prisma a hellish landscape of insecurity and pain",
            imgURL: "why.com",
            published: true,
            profileId: createProfile2.id
        }
    ]
    })
    
    const createComments = await prisma.comment.createMany({
        data: [{
            content: "You suck",
            postId: 1,
            userId: 2
        },
        {
            content: "Boooo",
            postId: 3,
            userId: 1
        },
        {
            content: "Insert some sexist comment here",
            postId: 2,
            userId: 2
        }
    ]
    })


    // Don't edit any of the code below this line
    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })