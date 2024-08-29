import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import RS from '@/shared/assets/icons/rss-logo.svg';
import GHlogo from '@/shared/assets/icons/logo-github.svg';
import style from './Footer.module.css';

const dataGitHub = [
  { name: 'Evgeny', url: 'https://github.com/zytsev' },
  { name: 'Anastasiia', url: 'https://github.com/petru6e4ka' },
  { name: 'Ivan', url: 'https://github.com/mindvan' },
];

export function Footer() {
  const t = useTranslations('Footer');
  return (
    <div className={style.footer}>
      <Link href="https://rs.school/">
        <Image src={RS} alt="RSSchool" width={20} height={20} />
      </Link>
      <span>2024</span>
      <div className={style.github}>
        <span>{t('creators')}</span>
        {dataGitHub.map((elem) => (
          <Link href={elem.url} key={elem.url}>
            <Image src={GHlogo} alt="GitHub" width={20} height={20} />
            {elem.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
