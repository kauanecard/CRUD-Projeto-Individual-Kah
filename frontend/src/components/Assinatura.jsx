import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Footer from "./Footer";
import Header from "./Header";
import "../../style/Assinatura.css";
import { useParams } from "react-router-dom";


//===============Configurações Modal===============//
Modal.setAppElement("#root");
export default function ModalButton() {
  const [modalAberto, SetModalAberto] = useState(false);

  function openModal() {
    SetModalAberto(true);
  }

  function closeModal() {
    SetModalAberto(false);
  }


  //===============Método GET===============//
  const [visualizar, setVisualizar] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/").then((res) => {
      const dadosPessoas = res.data;
      setVisualizar(dadosPessoas);
    });
  }, []);
  

//===============Editar plano===============//
const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [endereco, setEndereco] = useState();
  const [forma_pagamento, setForma_pagamento] = useState();


  const { id } = useParams()

  //Resolver
  function edit(id) {
    const confirma = confirm("Editando")
    const data = {
      nome: nome,
      email: email,
      endereco: endereco,
      }

    if(confirma){
      axios.put(`http://localhost:3000/${id}}`, data);
    }
  }

  //===============Método DELETE===============//  
  function deletarUsuario(id) {
    const confirma = confirm(
      `Você tem certeza que deseja excluir a assinatura WhiteList?`
    );
    if (confirma) {
      axios.delete(`http://localhost:3000/${id}`);

    }
  }
  return (
    <>
      <Header />
      <main id="mainAssinatura">
        <h2>Olá, usuário! Acesse as configurações sobre o seu plano.</h2>
        <div id="bloco">
          <p>Plano: WhiteList</p>
          <div id="wrapModal">
            <button onClick={openModal}>Mais informações</button>
            <Modal
              id="modal"
              isOpen={modalAberto}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
            >
              <div>
                <h2>Mais informações sobre o plano</h2>
              </div>

              <hr></hr>
              <div id="wrapContainer">
                <div id="cliente-user">
                  <div>
                    <div>
                      {visualizar.map((item) => (
                        <div key={item.id}>
                          <div id="infosModal">
                            <ul>
                              <li>
                                Nome impresso no cartão:{" "}
                                <input onChange={(e) => setNome(e.target.value)} defaultValue={item.nome_cartao}></input>
                              </li>
                              <li>
                                Email:{" "}
                                <input onChange={(e) => setEmail(e.target.value)}  defaultValue={item.email}></input>
                              </li>
                              <li>
                                Endereço:{" "}
                                <input  onChange={(e) => setEndereco(e.target.value)}  defaultValue={item.endereco}></input>
                              </li>
                              <li>
                                Plano adquirido:
                                <select>
                                  <option>WhiteList</option>
                                  <option>BlackList</option>
                                  <option>GoldenList</option>
                                </select>
                              </li>
                            </ul>
                          </div>

                          <div id="btnsModal">
                            <button onClick={() => edit(item.id)}>Editar</button>
                            <button onClick={() => deletarUsuario(item.id)}>
                              Cancelar assinatura
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div id="wrapBtnFechar">
                  <button id="btnFechar" onClick={closeModal}>Fechar</button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
