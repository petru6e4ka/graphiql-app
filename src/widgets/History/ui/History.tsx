import Link from 'next/link';
import { nanoid } from 'nanoid';
import { Table, TypographyStylesProvider } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useHeaders } from '@/features/store/headersStore';
import { useQueryParams } from '@/features/store/queryParamsStore';
import { useRestRequest } from '@/features/store/restRequestStore';
import { Method } from '@/shared/types/Method';

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
  const t = useTranslations('History');
  const { cleanHeaders, addHeaderInStore } = useHeaders();
  const { cleanQuery, addQueryInStore } = useQueryParams();
  const { addBody, addMethod, addUrl } = useRestRequest();

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

    addBody(obj.body);
    addMethod(obj.method as Method);
    addUrl(obj.url);
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
            <th>{t('date')}</th>
            <th>{t('method')}</th>
            <th>{t('url')}</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </TypographyStylesProvider>
  );
}
