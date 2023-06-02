import { useState, useEffect, useRef } from 'react';
import { ChevronDown as IconSetaPraBaixo } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IOption } from 'types/IOptions';

interface DropdownSelectProps {
  options: IOption[];
  onChange?: (opcaoSelecionada: IOption | null) => void;
}

const DropdownSelect = ({ options, onChange }: DropdownSelectProps) => {
  const [estaAberto, setSelectAberto] = useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<IOption | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionChange = (option: IOption) => {
    setOpcaoSelecionada(option);
    setSelectAberto(false);
    if (onChange) {
      onChange(option);
    }
  };

  const handleToggleDropdown = () => {
    setSelectAberto((prevState) => !prevState);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setSelectAberto(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`flex items-center cursor-pointer ${
          estaAberto ? 'open' : ''
        }`}
        onClick={handleToggleDropdown}
      >
        <IconSetaPraBaixo className="text-white" />
      </div>
      {estaAberto && (
        <ul className="absolute left-0 w-18 mt-2 p-0 bg-white shadow">
          {options.map((option) => (
            <li
              key={option.value}
              className={`p-2 cursor-pointer transition-colors duration-200 ${
                opcaoSelecionada === option ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleOptionChange(option)}
            >
              <Link to={option.to} className="flex items-center">
                {option.icon && <span className="mr-2">{option.icon}</span>}
                <span className="font-face-montserrat">{option.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownSelect;
