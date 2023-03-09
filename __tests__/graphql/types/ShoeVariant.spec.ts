import { gql } from '@apollo/client';
import { Gender } from '@prisma/client';
import assert from 'assert';
import { prisma } from '../../../src/global/db';
import { server } from '../../../src/pages/api/graphql';

describe('ShoeVariant test suite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockData = {
    id: '1',
    createdAt: new Date('2023-02-28T16:18:20.034Z'),
    updatedAt: new Date('2023-02-28T16:18:20.034Z'),
    sku: '1234567890',
    size: '10',
    stock: 15,
    shoe: {
      id: '1',
      createdAt: new Date('2023-02-28T16:18:20.034Z'),
      updatedAt: new Date('2023-02-28T16:18:20.034Z'),
      sku: '0123456789',
      model: 'shoe model 1',
      description: 'shoe model description',
      gender: Gender.Men,
      image: 'https://www.example.com',
      category: {
        id: '1',
        createdAt: new Date('2023-02-28T16:18:20.034Z'),
        updatedAt: new Date('2023-02-28T16:18:20.034Z'),
        category: 'CATEGORY 1',
      },
    },
  };

  it('fetches a variant by id', async () => {
    const findUniqueMock = jest.fn().mockResolvedValueOnce(mockData);
    prisma.shoeVariant.findUnique = findUniqueMock;

    const result = await server.executeOperation({
      query: gql`
        query GetVariantById($getVariantByIdId: Int!) {
          getVariantById(id: $getVariantByIdId) {
            id
            createdAt
            updatedAt
            sku
            size
            stock
            shoe {
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
            }
          }
        }
      `,
      variables: { getVariantByIdId: parseInt(mockData.id) },
    });

    assert(result.body.kind === 'single');
    expect(result.body.singleResult.errors).toBeUndefined();
    expect(result.body.singleResult.data?.getVariantById).toEqual(mockData);
  });

  it('fetches a variant by sku', async () => {
    const findUniqueMock = jest.fn().mockResolvedValueOnce(mockData);
    prisma.shoeVariant.findUnique = findUniqueMock;

    const result = await server.executeOperation({
      query: gql`
        query GetVariantBySku($sku: String!) {
          getVariantBySku(sku: $sku) {
            id
            createdAt
            updatedAt
            sku
            size
            stock
            shoe {
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
            }
          }
        }
      `,
      variables: { sku: mockData.sku },
    });

    assert(result.body.kind === 'single');
    expect(result.body.singleResult.errors).toBeUndefined();
    expect(result.body.singleResult.data?.getVariantBySku).toEqual(mockData);
  });

  it('adds a variant to a model', async () => {
    const createMock = jest.fn().mockResolvedValueOnce(mockData);
    prisma.shoeVariant.create = createMock;

    const result = await server.executeOperation({
      query: gql`
        mutation AddVariantToModel($shoeSku: String!, $size: String!, $stock: Int!) {
          addVariantToModel(shoeSku: $shoeSku, size: $size, stock: $stock) {
            id
            createdAt
            updatedAt
            sku
            size
            stock
            shoe {
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
            }
          }
        }
      `,
      variables: {
        shoeSku: mockData.shoe.sku,
        size: '12',
        stock: 15,
      },
    });

    assert(result.body.kind === 'single');
    expect(result.body.singleResult.errors).toBeUndefined();
    expect(result.body.singleResult.data?.addVariantToModel).toEqual(mockData);
  });
});
