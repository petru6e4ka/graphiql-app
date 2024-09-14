import Link from 'next/link';
import { nanoid } from 'nanoid';
import { Table, TypographyStylesProvider } from '@mantine/core';
import { useHeaders } from '@/features/store/headersStore';
import { useQueryParams } from '@/features/store/queryParamsStore';

interface RestRequest {
  date: string;
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string;
  searchParams: Record<string, string>;
}
interface Prop {
  elements: RestRequest[];
}

export function History({ elements }: Prop) {
  const { cleanHeaders, addHeaderInStore } = useHeaders();
  const { cleanQuery, addQueryInStore } = useQueryParams();

  const setCurrentRequest = (obj: RestRequest) => {
    cleanHeaders();
    cleanQuery();

    const headers = Object.keys(obj.headers);

    headers.forEach((header) => {
      const id = nanoid();
      addHeaderInStore({ id, name: header, value: obj.headers[header] });
    });

    const searchParams = Object.keys(obj.searchParams);

    searchParams.forEach((param) => {
      const id = nanoid();
      addQueryInStore({ id, name: param, value: obj.searchParams[param] });
    });
  };

  const rows = elements.map((element) => {
    const { date, method, url } = element;

    return (
      <tr key={date}>
        <td>{date}</td>
        <td>{method}</td>
        <td>
          <Link href={method === 'GRAPHQL' ? '/graphiql' : '/rest'} onClick={() => setCurrentRequest(element)}>
            {url}
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <TypographyStylesProvider w="100%">
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Method</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </TypographyStylesProvider>
  );
}
