import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { defaultQuestionnaireId } from 'src/utils/consts';

@Injectable()
export class QuestionnaireService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: number,
    createQuestionnaireDto: CreateQuestionnaireDto,
  ) {
    return this.prisma.questionnaire.create({
      data: {
        createdBy: userId,
        title: createQuestionnaireDto.title,
        description: createQuestionnaireDto.description,
      },
    });
  }
  
  async getQuestionnaireWithAnswers(id: number | null) {
    return this.prisma.questionnaire.findUnique({
      where: {
        id: defaultQuestionnaireId,
      },
      include: {
        sections: {
          include: {
            questions: {
              include: {
                questionAnswers: {
                  where: {
                    requestId: id,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async addQuestionsToSections(sections) {
    if (sections.length === 0) {  
      [];
    }
    for (const section of sections) {
      section.questions = await this.prisma.question.findMany({
        where: {
          questionnaireSectionId: section.id,
        },
      });
    }
    return sections;
  }

  remove(id: number) {
    return `This action removes a #${id} questionAnswer`;
  }
}
