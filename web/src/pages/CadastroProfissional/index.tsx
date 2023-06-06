import ButtonPadrao from 'components/ButtonPadrao';
import InputPadrao from 'components/InputPadrao';
import { useState } from 'react';
import axios from 'axios';

const CadastroProfissional = () => {
  const [usu_nomeCompleto, setUsuNome] = useState('');
  const [usu_email, setUsuEmail] = useState('');
  const [usu_foto, setUsuFoto] = useState('');
  const [usu_senha, setUsuSenha] = useState('');
  const [usu_confirmaSenha, setUsuConfirmarSenha] = useState('');
  const [pro_descricao, setProDescricao] = useState('');

  const submitProfissional = () => {
    axios
      .post('http://localhost:3001/api/insertUsuarioProfissional', {
        usu_nomeCompleto: usu_nomeCompleto,
        usu_email: usu_email,
        usu_senha: usu_senha,
        usu_foto: usu_foto,
        pro_descricao: pro_descricao,
      })
      .then((response) => {
        alert(response);
      });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('submit', {
      usu_nomeCompleto,
      usu_email,
      usu_senha,
      usu_foto,
      pro_descricao,
    });
  };

  return (
    <section className="flex items-center min-h-screen bg-gray-50">
      <div className="flex-1 h-full max-w-4xl mx-auto bg-[#414141] rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              className="object-cover w-full h-full"
              src="https://source.unsplash.com/user/erondu/1600x900"
              alt="img"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <form action="" onSubmit={handleSubmit}>
                <h1 className="mb-4 text-5xl font-bold text-center text-white font-face-montserrat">
                  Cadastro
                </h1>

                <div className="mt-12">
                  <InputPadrao
                    labelTexto="Nome"
                    placeholder="Digite aqui o seu nome.."
                    tipo="text"
                    nome="usu_nomeCompleto"
                    onChange={(e) => {
                      setUsuNome(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-4">
                  <InputPadrao
                    labelTexto="Email"
                    placeholder="Digite aqui o seu email..."
                    tipo="email"
                    nome="usu_email"
                    onChange={(e) => {
                      setUsuEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-4">
                  <InputPadrao
                    labelTexto="Foto"
                    placeholder="Insira o endereço da foto"
                    tipo="text"
                    nome="usu_foto"
                    onChange={(e) => {
                      setUsuFoto(e.target.value);
                    }}
                  />
                </div>

                <div className="mt-4">
                  <InputPadrao
                    labelTexto="Descricao"
                    placeholder="Digite aqui uma breve descrição..."
                    tipo="text"
                    nome="pro_descricao"
                    onChange={(e) => {
                      setProDescricao(e.target.value);
                    }}
                  />
                </div>

                <div className="mt-4">
                  <InputPadrao
                    labelTexto="Senha"
                    placeholder="Digite aqui a sua senha..."
                    tipo="password"
                    nome="usu_senha"
                    onChange={(e) => {
                      setUsuSenha(e.target.value);
                    }}
                  />
                </div>

                <div className="mt-4">
                  <InputPadrao
                    labelTexto="Confirmar senha"
                    placeholder="Confirme sua senha..."
                    tipo="password"
                    nome="usuSenhaConfirma"
                    onChange={(e) => {
                      setUsuConfirmarSenha(e.target.value);
                    }}
                  />
                </div>

                <div className="flex justify-center mt-12">
                  <ButtonPadrao
                    texto="Cadastrar"
                    tipo="submit"
                    onClick={submitProfissional}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CadastroProfissional;
