import { faker } from '@faker-js/faker';
import { Gender } from '@prisma/client';
import { prisma } from '../src/global/db';
import {
  IMG_PLACEHOLDER,
  MEN_BOOTS,
  MEN_LOAFERS,
  MEN_SANDALS,
  MEN_SHOES,
  MEN_SNEAKERS,
  WOMEN_BOOTS,
  WOMEN_HEELS,
  WOMEN_LOAFERS,
  WOMEN_SANDALS,
  WOMEN_SNEAKERS,
} from '../src/utils/shoeImages';

async function main() {
  await prisma.shoe.deleteMany({});

  const MEN_CATEGORIES = ['MEN_SNEAKERS', 'MEN_LOAFERS', 'MEN_BOOTS', 'MEN_SHOES', 'MEN_SANDALS'];
  const WOMEN_CATEGORIES = ['WOMEN_SNEAKERS', 'WOMEN_BOOTS', 'WOMEN_HEELS', 'WOMEN_LOAFERS', 'WOMEN_SANDALS'];

  async function createCategories(categories: string[]) {
    for (const category of categories) {
      await prisma.category.create({
        data: {
          category,
        },
      });
    }
  }

  async function createShoePair() {
    const gender: Gender = faker.helpers.arrayElement([Gender.Men, Gender.Women]);
    const category =
      gender === Gender.Men ? faker.helpers.arrayElement(MEN_CATEGORIES) : faker.helpers.arrayElement(WOMEN_CATEGORIES);
    let image: string;
    switch (category) {
      case 'MEN_SNEAKERS': {
        image = MEN_SNEAKERS;
        break;
      }
      case 'MEN_LOAFERS': {
        image = MEN_LOAFERS;
        break;
      }
      case 'MEN_BOOTS': {
        image = MEN_BOOTS;
        break;
      }
      case 'MEN_SHOES': {
        image = MEN_SHOES;
        break;
      }
      case 'MEN_SANDALS': {
        image = MEN_SANDALS;
        break;
      }
      case 'WOMEN_SNEAKERS': {
        image = WOMEN_SNEAKERS;
        break;
      }
      case 'WOMEN_BOOTS': {
        image = WOMEN_BOOTS;
        break;
      }
      case 'WOMEN_HEELS': {
        image = WOMEN_HEELS;
        break;
      }
      case 'WOMEN_LOAFERS': {
        image = WOMEN_LOAFERS;
        break;
      }
      case 'WOMEN_SANDALS': {
        image = WOMEN_SANDALS;
        break;
      }
      default: {
        image = IMG_PLACEHOLDER;
        break;
      }
    }

    await prisma.shoe.create({
      data: {
        sku: faker.random.numeric(10),
        model: 'shoe-' + faker.random.alphaNumeric(5),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta nulla mauris.',
        gender,
        category: {
          connect: {
            category: category,
          },
        },
        image,
        variants: {
          create: [
            {
              sku: faker.random.numeric(10),
              size: '9',
              stock: parseInt(faker.random.numeric(1)),
            },
            {
              sku: faker.random.numeric(10),
              size: '10',
              stock: parseInt(faker.random.numeric(1)),
            },
            {
              sku: faker.random.numeric(10),
              size: '11',
              stock: parseInt(faker.random.numeric(1)),
            },
          ],
        },
      },
    });
  }

  await createCategories(MEN_CATEGORIES);
  await createCategories(WOMEN_CATEGORIES);

  for (let i = 0; i < 50; i++) {
    await createShoePair();
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
