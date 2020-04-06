import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import LogoImg from '../../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi'

import './style.css'
import api from '../../services/api'

export default function NewIncident() {
    const ongId = localStorage.getItem('ongId')

    const [title, setTitulo] = useState('')
    const [description, setDescricao] = useState('')
    const [value, setValor] = useState('')

    const history = useHistory()

    async function handleInserir(e) {
        e.preventDefault()
        
        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('incidents', data, {
                headers:{
                    Authorization: ongId,
                }
            })

            history.push('/profile')
        }catch(err) {
            alert('Erro ao cadastrar caso, tente novamente.')
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={LogoImg} alt="Be The Hero" />

                    <h1>Cadastrar Novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Home.
                    </Link>
                </section>
                <form onSubmit={handleInserir}>
                    <input 
                     placeholder="Título do Caso"
                     value={title}
                     onChange={e => setTitulo(e.target.value)}
                    />

                    <textarea 
                     placeholder="Descrição"
                     value={description}
                     onChange={e => setDescricao(e.target.value)}
                    />


                    <input 
                     placeholder="Valor em reais"
                     value={value}
                     onChange={e => setValor(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}