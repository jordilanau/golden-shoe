import { gql } from '@apollo/client';
import assert from 'assert';
import { prisma } from '../../../src/global/db';
import { server } from '../../../src/pages/api/graphql';

describe('Category test suite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches all categories in the db', async () => {
    const mockData = {
      id: '1',
      createdAt: new Date('2023-02-28T16:18:20.034Z'),
      updatedAt: new Date('2023-02-28T16:18:20.034Z'),
      category: 'CATEGORY 1',
    };

    const findManyMock = jest.fn().mockResolvedValueOnce([mockData]);
    prisma.category.findMany = findManyMock;

    const result = await server.executeOperation({
      query: gql`
        query GetAllCategories {
          getAllCategories {
            id
            createdAt
            updatedAt
            category
          }
        }
      `,
    });

    assert(result.body.kind === 'single');
    expect(result.body.singleResult.errors).toBeUndefined();
    expect(result.body.singleResult.data?.getAllCategories).toEqual([mockData]);
  });

  it('fetches a category by id with no shoes', async () => {
    const mockData = {
      id: '1',
      createdAt: new Date('2023-02-28T16:18:20.034Z'),
      updatedAt: new Date('2023-02-28T16:18:20.034Z'),
      category: 'CATEGORY 1',
      Shoe: [],
    };

    const expected = {
      id: '1',
      createdAt: new Date('2023-02-28T16:18:20.034Z'),
      updatedAt: new Date('2023-02-28T16:18:20.034Z'),
      category: 'CATEGORY 1',
      Shoe: {
        pageInfo: {
          endCursor: null,
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: null,
        },
        edges: [],
      },
    };

    const findUniqueMock = jest.fn().mockResolvedValueOnce(mockData);
    prisma.category.findUnique = findUniqueMock;

    const result = await server.executeOperation({
      query: gql`
        query GetCategoryById($getCategoryByIdId: Int!, $after: ID, $first: Int, $before: ID, $last: Int) {
          getCategoryById(id: $getCategoryByIdId) {
            id
            createdAt
            updatedAt
            category
            Shoe(after: $after, first: $first, before: $before, last: $last) {
              pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
              }
              edges {
                cursor
                node {
                  id
                  createdAt
                  updatedAt
                  sku
                  model
                  description
                  gender
                  image
                  category {
                    category
                    createdAt
                    id
                    updatedAt
                  }
                  variants {
                    createdAt
                    id
                    size
                    sku
                    stock
                    updatedAt
                  }
                }
              }
            }
          }
        }
      `,
      variables: { getCategoryByIdId: 1 },
    });

    assert(result.body.kind === 'single');
    expect(result.body.singleResult.errors).toBeUndefined();
    expect(result.body.singleResult.data?.getCategoryById).toEqual(expected);
  });

  it('fetches a category by name with no shoes', async () => {
    const mockData = {
      id: '1',
      createdAt: new Date('2023-02-28T16:18:20.034Z'),
      updatedAt: new Date('2023-02-28T16:18:20.034Z'),
      category: 'CATEGORY 1',
      Shoe: [],
    };

    const expected = {
      id: '1',
      createdAt: new Date('2023-02-28T16:18:20.034Z'),
      updatedAt: new Date('2023-02-28T16:18:20.034Z'),
      category: 'CATEGORY 1',
      Shoe: {
        pageInfo: {
          endCursor: null,
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: null,
        },
        edges: [],
      },
    };

    const findUniqueMock = jest.fn().mockResolvedValueOnce(mockData);
    prisma.category.findUnique = findUniqueMock;

    const result = await server.executeOperation({
      query: gql`
        query GetCategoryByName($category: String!, $after: ID, $before: ID, $first: Int, $last: Int) {
          getCategoryByName(category: $category) {
            id
            createdAt
            updatedAt
            category
            Shoe(after: $after, before: $before, first: $first, last: $last) {
              pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
              }
              edges {
                cursor
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
                    createdAt
                    id
                    size
                    sku
                    stock
                    updatedAt
                  }
                }
              }
            }
          }
        }
      `,
      variables: { category: 'MEN_BOOTS' },
    });

    assert(result.body.kind === 'single');
    expect(result.body.singleResult.errors).toBeUndefined();
    expect(result.body.singleResult.data?.getCategoryByName).toEqual(expected);
  });

  it('creates a new category', async () => {
    const mockData = {
      id: '1',
      createdAt: new Date('2023-02-28T16:18:20.034Z'),
      updatedAt: new Date('2023-02-28T16:18:20.034Z'),
      category: 'CATEGORY 1',
    };

    const createMock = jest.fn().mockResolvedValueOnce(mockData);
    prisma.category.create = createMock;

    const result = await server.executeOperation({
      query: gql`
        mutation CreateCategory($category: String!) {
          createCategory(category: $category) {
            id
            createdAt
            updatedAt
            category
          }
        }
      `,
      variables: { category: mockData.category },
    });

    assert(result.body.kind === 'single');
    expect(result.body.singleResult.errors).toBeUndefined();
    expect(result.body.singleResult.data?.createCategory).toEqual(mockData);
  });
});
