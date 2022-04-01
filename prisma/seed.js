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

    const post1 = await prisma.post.findUnique({
        where: {
          id: 1,
        },
      })

      const post2 = await prisma.post.findUnique({
        where: {
          id: 2,
        },
      })

      const post3 = await prisma.post.findUnique({
        where: {
          id: 3,
        },
      })
    
    const createComments1 = await prisma.comment.create({
        data: {
            content: "This is my first comment",
            postId: post1.id,
            userId: user2.id, 
            subComments : {
                create : [{
                    content: "You suck",
                    postId: post1.id,
                    userId: user1.id
                }
            ]
            }     
        },
    })

    const createComments2 = await prisma.comment.create({
        data: {
            content: "Banging blog post mate",
            postId: post2.id,
            userId: user1.id, 
            subComments : {
                create : [{
                    content: "I disagree",
                    postId: post2.id,
                    userId: user2.id
                }
            ]
            }     
        },
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