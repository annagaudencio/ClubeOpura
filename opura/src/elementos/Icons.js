// Importando todos os SVGs
import baixar from '../../public/icons/acoes/baixar.svg';
import CheckIcon from '../../public/icons/acoes/Check.svg';
import CrossIcon from '../../public/icons/acoes/Cross.svg';
import EditAltIcon from '../../public/icons/acoes/Edit-alt.svg';
import ExcluirIcon from '../../public/icons/acoes/excluir.svg';
import PlusIcon from '../../public/icons/acoes/Plus.svg';
import VerOffIcon from '../../public/icons/acoes/ver-off.svg';
import VerOnIcon from '../../public/icons/acoes/ver-on.svg';

import BeneficiosIcon from '../../public/icons/nav/beneficios.svg';
import BuscaIcon from '../../public/icons/nav/busca.svg';
import EstrelaIcon from '../../public/icons/nav/estrela.svg';
import HomeIcon from '../../public/icons/nav/home.svg';
import NavIcon from '../../public/icons/nav/nav.svg';
import OpuraIcon from '../../public/icons/nav/opura.svg';
import UserIcon from '../../public/icons/nav/user.svg';

import ArrowDownIcon from '../../public/icons/setas/Arrow down.svg';
import ArrowLeftIcon from '../../public/icons/setas/Arrow left.svg';
import ArrowRightIcon from '../../public/icons/setas/Arrow right.svg';
import ArrowUpIcon from '../../public/icons/setas/Arrow up.svg';
import AtualizarIcon from '../../public/icons/setas/atualizar.svg';
import CaretDownIcon from '../../public/icons/setas/Caret down.svg';
import CaretLeftIcon from '../../public/icons/setas/Caret left.svg';
import CaretRightIcon from '../../public/icons/setas/Caret right.svg';
import CaretUpIcon from '../../public/icons/setas/Caret up.svg';
import Calendario from '../../public/icons/acoes/calendario.svg';
import logoVertical from '../../public/midia/logotipo-vertical.svg';

// Mapeando os ícones para names de fácil acesso
const icons = {
    baixar: baixar,
    check: CheckIcon,
    cross: CrossIcon,
    editAlt: EditAltIcon,
    excluir: ExcluirIcon,
    plus: PlusIcon,
    verOff: VerOffIcon,
    verOn: VerOnIcon,
    beneficios: BeneficiosIcon,
    busca: BuscaIcon,
    estrela: EstrelaIcon,
    home: HomeIcon,
    nav: NavIcon,
    opura: OpuraIcon,
    user: UserIcon,
    arrowDown: ArrowDownIcon,
    arrowLeft: ArrowLeftIcon,
    arrowRight: ArrowRightIcon,
    arrowUp: ArrowUpIcon,
    atualizar: AtualizarIcon,
    caretDown: CaretDownIcon,
    caretLeft: CaretLeftIcon,
    caretRight: CaretRightIcon,
    caretUp: CaretUpIcon,
    caledario: Calendario,
    logoVertical: logoVertical,
};

// Componente Icon para utilizar os SVGs
export default function Icon({ name, ...props }) {
  const SvgIcon = icons[name];
  return SvgIcon ? <SvgIcon {...props} /> : null;
}