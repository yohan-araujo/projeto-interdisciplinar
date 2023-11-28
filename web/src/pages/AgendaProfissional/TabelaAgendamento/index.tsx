import { useEffect } from 'react';
import { IAgendamento } from 'types/IAgendamento';

interface TabelaAgendamentoProps {
  agendamentos: IAgendamento[];
  agendamentosSelecionados: number[];
  onAgendamentoSelecionado: (agendamento: IAgendamento) => void;
}

const TabelaAgendamento = ({
  agendamentos,
  onAgendamentoSelecionado,
  agendamentosSelecionados,
}: TabelaAgendamentoProps) => {
  useEffect(() => {
    console.log(agendamentosSelecionados);
  }, [agendamentosSelecionados]);

  const handleAgendamentoSelecionado = (agendamento: IAgendamento) => {
    onAgendamentoSelecionado(agendamento);
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-black">
          <th className="border p-2 text-center text-white font-face-montserrat">
            Data
          </th>
          <th className="border p-2 text-center text-white font-face-montserrat">
            Hora
          </th>
          <th className="border p-2 text-center text-white font-face-montserrat">
            Nome do Cliente
          </th>
          <th className="border p-2 text-center text-white font-face-montserrat">
            Servico
          </th>
          <th className="border p-2 text-center text-white font-face-montserrat">
            Status
          </th>
          <th className="border p-2 text-center text-white font-face-montserrat">
            Selecionar
          </th>
        </tr>
      </thead>
      <tbody>
        {agendamentos.map((agendamento) => (
          <tr
            key={agendamento.age_id}
            className="hover:bg-[#E29C31] text-white hover:text-black transition duration-200 ease-in-out"
          >
            <td className="border p-2 text-center  hover:text-black font-face-montserrat font-bold">
              {new Date(agendamento.age_data).toLocaleDateString('pt-BR')}
            </td>
            <td className="border p-2 text-center font-face-montserrat font-bold">
              {agendamento.age_hora.substring(0, 5)}
            </td>
            <td className="border p-2 text-center font-face-montserrat font-bold">
              {agendamento.usu_nomeCompleto}
            </td>
            <td className="border p-2 text-center font-face-montserrat font-bold">
              {agendamento.ser_tipo}
            </td>
            <td className="border p-2 text-center font-face-montserrat font-bold">
              {agendamento.age_status ? 'Completo' : 'Incompleto'}
            </td>
            <td className="border p-2 text-center font-face-montserrat font-bold">
              <input
                type="checkbox"
                value={agendamento.age_id}
                checked={agendamentosSelecionados.includes(agendamento.age_id)}
                onChange={() => handleAgendamentoSelecionado(agendamento)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelaAgendamento;
