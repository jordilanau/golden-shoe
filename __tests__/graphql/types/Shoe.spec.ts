import { gql } from '@apollo/client';
import { Gender } from '@prisma/client';
import assert from 'assert';
import { prisma } from '../../../src/global/db';
import { server } from '../../../src/pages/api/graphql';

describe('Shoe test suite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches all shoe models in the db', async () => {
    const mockData = {
      id: '1',
      createdAt: new Date('2023-02-28T16:18:20.034Z'),
      updatedAt: new Date('2023-02-28T16:18:20.034Z'),
      sku: '1234567890',
      model: 'product 1',
      description: 'description product 1',
      image: 'https://www.example.com',
      gender: Gender.Women,
      category: {
        id: '1',
        createdAt: new Date('2023-02-28T16:18:20.034Z'),
        updatedAt: new Date('2023-02-28T16:18:20.034Z'),
        category: 'CATEGORY 1',
      },
      variants: [],
    };

    const expected = {
      edges: [
        {
          node: {
            id: '1',
            createdAt: new Date('2023-02-28T16:18:20.034Z'),
            updatedAt: new Date('2023-02-28T16:18:20.034Z'),
            sku: '1234567890',
            model: 'product 1',
            description: 'description product 1',
            image: 'https://www.example.com',
            gender: Gender.Women,
            category: {
              id: '1',
              createdAt: new Date('2023-02-28T16:18:20.034Z'),
              updatedAt: new Date('2023-02-28T16:18:20.034Z'),
              category: 'CATEGORY 1',
            },
            variants: [],
          },
        },
      ],
      pageInfo: {
        endCursor: expect.any(String) as string,
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: expect.any(String) as string,
      },
    };

    const findManyMock = jest.fn().mockResolvedValueOnce([mockData]);
    prisma.shoe.findMany = findManyMock;

    const result = await server.executeOperation({
      query: gql`
        query GetAllModels {
          getAllModels {
            edges {
              node {
                category {
                  category
                  createdAt
                  id
                  updatedAt
                }
                createdAt
                description
                gender
                id
                image
                model
                sku
                updatedAt
                variants {
                  id
                  createdAt
                  updatedAt
                  sku
                  size
                  stock
                }
              }
            }
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
            }
          }
        }
      `,
    });

    assert(result.body.kind === 'single');
    expect(result.body.singleResult.errors).toBeUndefined();
    expect(result.body.singleResult.data?.getAllModels).toEqual(expected);
  });

  it('fetches a shoe model by id', async () => {
    const mockData = {
      id: '1',
      createdAt: new Date('2023-02-28T16:18:20.034Z'),
      updatedAt: new Date('2023-02-28T16:18:20.034Z'),
      sku: '1234567890',
      model: 'product 1',
      description: 'description product 1',
      image: 'https://www.example.com',
      gender: Gender.Women,
      category: {
        id: '1',
        createdAt: new Date('2023-02-28T16:18:20.034Z'),
        updatedAt: new Date('2023-02-28T16:18:20.034Z'),
        category: 'CATEGORY 1',
      },
      variants: [],
    };

    const findUniqueMock = jest.fn().mockResolvedValueOnce(mockData);
    prisma.shoe.findUnique = findUniqueMock;

    const result = await server.executeOperation({
      query: gql`
        query GetModelById($getModelByIdId: Int!) {
          getModelById(id: $getModelByIdId) {
            id
            createdAt
            updatedAt
            sku
            model
            description
            gender
            image
            category {
              id
              createdAt
              updatedAt
              category
            }
            variants {
              id
              createdAt
              updatedAt
              sku
              size
              stock
            }
          }
        }
      `,
      variables: { getModelByIdId: 1 },
    });

    assert(result.body.kind === 'single');
    expect(result.body.singleResult.errors).toBeUndefined();
    expect(result.body.singleResult.data?.getModelById).toEqual(mockData);
  });

  it('fetches a shoe model by sku', async () => {
    const mockData = {
      id: '1',
      createdAt: new Date('2023-02-28T16:18:20.034Z'),
      updatedAt: new Date('2023-02-28T16:18:20.034Z'),
      sku: '1234567890',
      model: 'product 1',
      description: 'description product 1',
      image: 'https://www.example.com',
      gender: Gender.Women,
      category: {
        id: '1',
        createdAt: new Date('2023-02-28T16:18:20.034Z'),
        updatedAt: new Date('2023-02-28T16:18:20.034Z'),
        category: 'CATEGORY 1',
      },
      variants: [],
    };

    const findUniqueMock = jest.fn().mockResolvedValueOnce(mockData);
    prisma.shoe.findUnique = findUniqueMock;

    const result = await server.executeOperation({
      query: gql`
        query GetModelBySku($sku: String!) {
          getModelBySku(sku: $sku) {
            id
            createdAt
            updatedAt
            sku
            model
            description
            gender
            image
            category {
              id
              createdAt
              updatedAt
              category
            }
            variants {
              id
              createdAt
              updatedAt
              sku
              size
              stock
            }
          }
        }
      `,
      variables: { sku: '1234567890' },
    });

    assert(result.body.kind === 'single');
    expect(result.body.singleResult.errors).toBeUndefined();
    expect(result.body.singleResult.data?.getModelBySku).toEqual(mockData);
  });

  it('creates a new model', async () => {
    const mockData = {
      id: '1',
      createdAt: new Date('2023-02-28T16:18:20.034Z'),
      updatedAt: new Date('2023-02-28T16:18:20.034Z'),
      sku: '1234567890',
      model: 'shoe-12345',
      description: 'Some new random description',
      image: 'http://www.image.com',
      gender: Gender.Women,
      variants: [],
      category: {
        id: '1',
        createdAt: new Date('2023-02-28T16:18:20.034Z'),
        updatedAt: new Date('2023-02-28T16:18:20.034Z'),
        category: 'CATEGORY 1',
      },
    };

    const createMock = jest.fn().mockResolvedValueOnce(mockData);
    prisma.shoe.create = createMock;

    const result = await server.executeOperation({
      query: gql`
        mutation CreateModel(
          $category: String!
          $description: String!
          $gender: Gender!
          $image: String!
          $model: String!
        ) {
          createModel(category: $category, description: $description, gender: $gender, image: $image, model: $model) {
            createdAt
            description
            gender
            id
            image
            model
            sku
            updatedAt
            variants {
              createdAt
              id
              size
              sku
              stock
              updatedAt
            }
            category {
              id
              createdAt
              updatedAt
              category
            }
          }
        }
      `,
      variables: {
        category: mockData.category.category,
        description: mockData.description,
        gender: mockData.gender,
        image: mockData.image,
        model: mockData.model,
      },
    });

    assert(result.body.kind === 'single');
    expect(result.body.singleResult.errors).toBeUndefined();
    expect(result.body.singleResult.data?.createModel).toEqual(mockData);
  });
});
