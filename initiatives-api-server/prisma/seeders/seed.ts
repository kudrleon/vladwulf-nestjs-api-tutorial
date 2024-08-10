import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const existingQuestionnaire =
    await prisma.questionnaire.findFirst({
      where: {
        title: 'Project Request',
      },
    });

  if (!existingQuestionnaire) {
    const questionnaire =
      await prisma.questionnaire.create({
        data: {
          title: 'Project Request',
          description:
            'Project Request questionnaire.',
          sections: {
            create: [
              {
                title: 'Business Value',
                description:
                  'General Business Value Questions',
                questions: {
                  create: [
                    {
                      question: 'Question 1',
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    },
                    {
                      question: 'Question 2',
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    },
                  ],
                },
              },
              {
                title: 'Security Questions',
                description: 'Security Questions',
                questions: {
                  create: [
                    {
                      question: 'Question 1',
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    },
                    {
                      question: 'Question 2',
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    },
                  ],
                },
              },
            ],
          },
        },
      });

    console.log(
      'Seed data created:',
      questionnaire,
    );
  } else {
    console.log(
      'Seed data already exists, skipping creation.',
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
