'use client';

import { useState } from 'react';
import { Section, Cell, List, Button, Input, Placeholder, Banner } from '@telegram-apps/telegram-ui';
import { Page } from '@/components/Page';

interface AdditionalTicket {
  id: number;
  firstName: string;
  lastName: string;
  idNumber: string;
}

export default function Home() {
  const [mainTicket, setMainTicket] = useState(false);
  const [additionalTickets, setAdditionalTickets] = useState<AdditionalTicket[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [currentTicket, setCurrentTicket] = useState({
    firstName: '',
    lastName: '',
    idNumber: ''
  });

  const canAddMoreTickets = additionalTickets.length < 2;

  const handleRequestMainTicket = () => {
    setMainTicket(true);
    setShowForm(false);
  };

  const handleAddAdditionalTicket = () => {
    if (canAddMoreTickets && currentTicket.firstName && currentTicket.lastName && currentTicket.idNumber) {
      setAdditionalTickets([
        ...additionalTickets,
        {
          id: Date.now(),
          ...currentTicket
        }
      ]);
      setCurrentTicket({ firstName: '', lastName: '', idNumber: '' });
      setShowForm(false);
    }
  };

  const handleRemoveTicket = (id: number) => {
    setAdditionalTickets(additionalTickets.filter(ticket => ticket.id !== id));
  };

  const handleSubmitRequest = () => {
    if (mainTicket) {
      setSubmitted(true);
      // Aqui você pode enviar os dados para o backend
      console.log('Pedido submetido:', {
        mainTicket,
        additionalTickets
      });
    }
  };

  const handleReset = () => {
    setMainTicket(false);
    setAdditionalTickets([]);
    setShowForm(false);
    setSubmitted(false);
    setCurrentTicket({ firstName: '', lastName: '', idNumber: '' });
  };

  if (submitted) {
    return (
      <Page back={false}>
        <Placeholder
          header="Pedido Confirmado! ✅"
          description={`O seu pedido de ${1 + additionalTickets.length} bilhete(s) foi registado com sucesso. Receberá uma confirmação em breve.`}
        >
          <div style={{ fontSize: '80px' }}>🎫</div>
        </Placeholder>
        <div style={{ padding: '16px' }}>
          <Button stretched size="l" onClick={handleReset}>
            Fazer Novo Pedido
          </Button>
        </div>
      </Page>
    );
  }

  return (
    <Page back={false}>
      <List>
        <Section
          header="🎫 Bilheteira Alvinegra"
          footer="Solicite o seu bilhete para o próximo jogo. Pode adicionar até 2 bilhetes adicionais."
        >
          {!mainTicket ? (
            <Cell
              subtitle="Clique para solicitar o seu bilhete"
              onClick={handleRequestMainTicket}
              style={{ cursor: 'pointer' }}
            >
              Pedir o Meu Bilhete
            </Cell>
          ) : (
            <Cell
              subtitle="Bilhete principal confirmado"
              after={
                <span style={{ color: 'var(--tgui--link_color)', fontSize: '20px' }}>✓</span>
              }
            >
              O Meu Bilhete
            </Cell>
          )}
        </Section>

        {mainTicket && (
          <Section
            header="Bilhetes Adicionais"
            footer={`Pode adicionar até 2 bilhetes adicionais (${additionalTickets.length}/2 adicionados)`}
          >
            {additionalTickets.map((ticket, index) => (
              <Cell
                key={ticket.id}
                subtitle={`CC: ${ticket.idNumber}`}
                after={
                  <Button
                    mode="plain"
                    size="s"
                    onClick={() => handleRemoveTicket(ticket.id)}
                  >
                    Remover
                  </Button>
                }
              >
                {`${index + 1}. ${ticket.firstName} ${ticket.lastName}`}
              </Cell>
            ))}

            {!showForm && canAddMoreTickets && (
              <Cell
                onClick={() => setShowForm(true)}
                style={{ cursor: 'pointer', color: 'var(--tgui--link_color)' }}
              >
                + Adicionar Bilhete
              </Cell>
            )}
          </Section>
        )}

        {showForm && canAddMoreTickets && (
          <Section header="Dados do Bilhete Adicional">
            <div style={{ padding: '12px 16px' }}>
              <Input
                header="Primeiro Nome"
                placeholder="Ex: João"
                value={currentTicket.firstName}
                onChange={(e) => setCurrentTicket({ ...currentTicket, firstName: e.target.value })}
                style={{ marginBottom: '12px' }}
              />
              <Input
                header="Último Nome"
                placeholder="Ex: Silva"
                value={currentTicket.lastName}
                onChange={(e) => setCurrentTicket({ ...currentTicket, lastName: e.target.value })}
                style={{ marginBottom: '12px' }}
              />
              <Input
                header="Número de Cartão de Cidadão"
                placeholder="Ex: 12345678"
                value={currentTicket.idNumber}
                onChange={(e) => setCurrentTicket({ ...currentTicket, idNumber: e.target.value })}
                style={{ marginBottom: '16px' }}
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                  stretched
                  size="m"
                  mode="filled"
                  onClick={handleAddAdditionalTicket}
                  disabled={!currentTicket.firstName || !currentTicket.lastName || !currentTicket.idNumber}
                >
                  Confirmar
                </Button>
                <Button
                  stretched
                  size="m"
                  mode="plain"
                  onClick={() => {
                    setShowForm(false);
                    setCurrentTicket({ firstName: '', lastName: '', idNumber: '' });
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </Section>
        )}

        {mainTicket && (
          <div style={{ padding: '16px' }}>
            <Banner
              header="Resumo do Pedido"
              subheader={`Total: ${1 + additionalTickets.length} bilhete(s)`}
              type="section"
            />
            <Button
              stretched
              size="l"
              onClick={handleSubmitRequest}
              style={{ marginTop: '12px' }}
            >
              Finalizar Pedido
            </Button>
            <Button
              stretched
              size="l"
              mode="plain"
              onClick={handleReset}
              style={{ marginTop: '8px' }}
            >
              Cancelar Tudo
            </Button>
          </div>
        )}
      </List>
    </Page>
  );
}
