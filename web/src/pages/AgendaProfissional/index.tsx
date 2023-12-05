import { useEffect, useState } from 'react';
import Calendario from '../../components/Calendario';
import { IAgendamento } from 'types/IAgendamento';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import { meses } from 'json';
import ListaCardsClientes from './ListaCliente';

const AgendaProfissional = () => {
  const [agendamentosDoDia, setAgendamentosDoDia] = useState<IAgendamento[]>(
    []
  );
  const [diaSelecionado, setDiaSelecionado] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (diaSelecionado) {
      axios
        .get(
          `http://localhost:3001/api/getAgendamentos/${diaSelecionado.format(
            'YYYY-MM-DD'
          )}/${sessionStorage.getItem('proId')}`
        )
        .then((response) => {
          setAgendamentosDoDia(response.data);
        })
        .catch((error) => {
          console.error('Erro ao carregar os agendamentos:', error);
        });
    } else {
      setAgendamentosDoDia([]);
      console.log('Agendamentos', agendamentosDoDia);
    }
  }, [diaSelecionado]);

  const handleDiaSelecionado = (dia: Dayjs | null) => {
    setDiaSelecionado(dia);
  };

  const mesAtual = dayjs().month();

  return (
    <section className="flex bg-black min-h-screen justify-center">
      <div className="w-2/3 h-[48rem] bg-[#1D1D1D] my-24">
        <span className="flex justify-center uppercase text-[#E29C31] font-merriweather my-12 text-5xl">
          Agenda
        </span>
        <div className="grid grid-cols-2">
          <div>
            <div className="flex justify-center">
              {' '}
              <Calendario onDiaSelecionado={handleDiaSelecionado} />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            {diaSelecionado ? (
              <>
                <div className="text-center my-2 font-bold text-3xl">
                  <p className="text-white font-face-montserrat">
                    Agendados para: <br />{' '}
                    <span className="text-[#E29C31] font-face-montserrat">
                      {diaSelecionado.format('DD')} de{' '}
                      {meses[diaSelecionado.month()]}
                    </span>{' '}
                    de{' '}
                    <span className="text-[#E29C31] font-face-montserrat">
                      {diaSelecionado.year()}
                    </span>
                  </p>
                </div>

                <div>
                  <ListaCardsClientes agendamentos={agendamentosDoDia} />
                </div>
              </>
            ) : (
              <div>
                <span>escolha um dia</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgendaProfissional;
