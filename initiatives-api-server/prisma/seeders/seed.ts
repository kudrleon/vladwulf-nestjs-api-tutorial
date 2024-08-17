import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const existingQuestionnaire =
    await prisma.questionnaire.findFirst({
      where: {
        title: 'Project Request Seed',
      },
    });
  const questionnairesCount =
    Math.round(Math.random() * 10) + 2;
  if (!existingQuestionnaire) {
    const questionnaire =
      await prisma.questionnaire.create({
        data: {
          title: 'Project Request Seed',
          description: `Project Request questionnaire.`,
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
                      order: 1,
                    },
                    {
                      question: 'Question 2',
                      createdAt: new Date(),
                      updatedAt: new Date(),
                      order: 2,
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
                      order: 1,
                    },
                    {
                      question: 'Question 2',
                      createdAt: new Date(),
                      updatedAt: new Date(),
                      order: 2,
                    },
                  ],
                },
              },
            ],
          },
        },
      });

    console.log(
      'Seed data created: with default questionnaire',
      questionnaire,
    );
    for (
      let i = 0;
      i < questionnairesCount;
      i++
    ) {
      const numberOfSections =
        Math.round(Math.random() * 10) + 2;
      const sections = new Array(numberOfSections)
        .fill(null)
        .map((_, index) => ({
          title: `Section ${index + 1}`,
          description: `Section ${
            index + 1
          } description`,
          questions: {
            create: new Array(
              Math.round(Math.random() * 5) + 2,
            )
              .fill(null)
              .map((_, index) => ({
                question: `Question ${index + 1}`,
                createdAt: new Date(),
                updatedAt: new Date(),
                order: index + 1,
              })),
          },
        }));
      const questionnaire =
        await prisma.questionnaire.create({
          data: {
            title: 'Project Request Seed',
            description: `Project Request questionnaire. Iteration ${i}`,
            sections: {
              create: sections,
            },
          },
        });

      console.log(
        'Seed data created:',
        questionnaire,
      );
    }
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
