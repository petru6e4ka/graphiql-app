import Link from 'next/link';
import { nanoid } from 'nanoid';
import { Table, TypographyStylesProvider } from '@mantine/core';
import { useHeaders, useHistory } from '@/features/store/store';

interface TypeRequest {
  date: string;
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string;
  searchParams: Record<string, string>;
}
interface Prop {
  elements: TypeRequest[];
}

export function HistoryUI(prop: Prop) {
  const { addHistoryInStore } = useHistory();
  const { cleanHeaders, addHeaderInStore } = useHeaders();

  const sendHistoryInStore = (obj: TypeRequest) => {
    cleanHeaders();
    addHistoryInStore(obj);
    const arrKeys = Object.keys(obj.headers);
    arrKeys.forEach((key) => {
      const id = nanoid();
      addHeaderInStore({ id, Key: key, Value: obj.headers[key] });
    });
  };

  // eslint-disable-next-line react/destructuring-assignment
  const rows = prop.elements.map((element) => (
    <tr key={element.date}>
      <td>{element.date}</td>
      <td>{element.method}</td>
      <td>
        <Link href={element.method === 'GRAPHQL' ? '/graphiql' : '/rest'} onClick={() => sendHistoryInStore(element)}>
          {element.url}
        </Link>
      </td>
    </tr>
  ));
  return (
    <TypographyStylesProvider>
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
