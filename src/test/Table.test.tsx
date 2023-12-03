import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { COUNTRIES_QUERY } from '../api/queries';
import Table from '../components/Table';

const apolloMocks = [
  {
    request: {
      query: COUNTRIES_QUERY,
    },
    result: {
      data: {
        countries: [
          { code: 'EE', emoji: '🇪🇪', name: 'Estonia' },
          { code: 'US', emoji: '🇺🇸', name: 'United States' },
          { code: 'ES', emoji: '🇪🇸', name: 'Spain' },
        ],
      },
    },
  },
];

describe('Table component', () => {
  it('renders the table with data', async () => {
    render(
      <MockedProvider
        mocks={apolloMocks}
        addTypename={false}>
        <Table filter="" />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Estonia')).toBeInTheDocument();
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('Spain')).toBeInTheDocument();
    });
  });

  it('filters the countries based on the provided filter', async () => {
    render(
      <MockedProvider
        mocks={apolloMocks}
        addTypename={false}>
        <Table filter="EE" />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Estonia')).toBeInTheDocument();
      expect(screen.queryByText('United States')).toBeNull();
      expect(screen.queryByText('Spain')).toBeNull();
    });
  });
});
