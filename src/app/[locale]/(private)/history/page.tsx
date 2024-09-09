'use client';

/* eslint-disable max-len */
import Link from 'next/link';
import { useTranslations } from 'next-intl';
// eslint-disable-next-line object-curly-newline
import { Title, Button, Table, TypographyStylesProvider } from '@/shared/ui';

interface TypeLS {
  date: Date;
  url: string;
  method: string;
  headers: {
    'content-type': string;
    page: string;
  };
  body: string;
  searchParams: {
    param1: string;
    param2: string;
  };
}
const toLS = {
  date: new Date(),
  url: 'https://66716cbfe083e62ee43b8e10.mockapi.io/',
  method: 'POST',
  headers: { 'content-type': 'application/json', page: '1' },
  body: 'body',
  searchParams: {
    param1: 'param1',
    param2: 'param2',
  },
};
const toLS1 = {
  date: new Date(),
  url: 'https://66716cbfe083e62ee43b8e10.mockapi.io/',
  method: 'GET',
  headers: { 'content-type': 'application/json', page: '1' },
  body: 'body',
  searchParams: {
    param1: 'param1',
    param2: 'param2',
  },
};
const toLS2 = {
  date: new Date(),
  url: 'https://66716cbfe083e62ee43b8e10.mockapi.io/',
  method: 'GRAPHQL',
  headers: { 'content-type': 'application/json', page: '1' },
  body: 'body',
  searchParams: {
    param1: 'param1',
    param2: 'param2',
  },
};
const ob = [toLS, toLS1, toLS2];
function setLS(obj: TypeLS[]) {
  const data = JSON.stringify(obj);
  localStorage.setItem('requests', data);
}

const elements = [
  {
    date: '21.02.22',
    URL: 'http://localhost:5137/POST/aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3Rz/eyJ0aXRsZSI6ImZha2VUaXRsZSIsInVzZXJJZCI6MSwiYm9keSI6ImZha2VNZXNzYWdlIn0=?Content-Type=application%2Fjson',
    method: 'GET',
  },
  {
    date: '22.03.21',
    URL: 'http://localhost:5137/POST/aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3Rz/eyJ0aXRsZSI6ImZha2VUaXRsZSIsInVzZXJJZCI6MSwiYm9keSI6ImZha2VNZXNzYWdlIn0=?Content-Type=application%2Fjson',
    method: 'POST',
  },
];

export default function History() {
  const t = useTranslations('History');

  const rows = elements.map((element) => (
    <tr key={element.date}>
      <td>{element.date}</td>
      <td>{element.method}</td>
      <td>
        <Link href="/">{element.URL}</Link>
      </td>
    </tr>
  ));
  return (
    <TypographyStylesProvider>
      <div>
        <Title>{t('title')}</Title>
        <Button onClick={() => setLS(ob)}>Hello world</Button>
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
      </div>
    </TypographyStylesProvider>
  );
}
