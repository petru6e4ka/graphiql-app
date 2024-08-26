import Image from 'next/image';
import logotype from '@/shared/assets/icons/cliente.svg';

function Logo() {
  return (
    <div>
      <Image src={logotype} width={50} height={50} alt="logo" />
    </div>
  );
}

export default Logo;
