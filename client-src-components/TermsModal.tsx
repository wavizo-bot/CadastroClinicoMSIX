// Modal bloqueante de aceite de termos — exibido na primeira execução e sempre
// que os termos forem atualizados (TERMS_VERSION). Aceite persistido em
// localStorage (equivale ao arquivo de config em web/MSIX/Capacitor).
import { useEffect, useState } from "react";
import { App } from "@capacitor/app";

export const TERMS_VERSION = "1.0";
const STORAGE_KEY = "cadclinico-terms-acceptance";

type TermsAcceptance = { version: string; acceptedAt: string };

export function isTermsAccepted(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw) as TermsAcceptance;
    return data?.version === TERMS_VERSION;
  } catch {
    return false;
  }
}

function saveTermsAcceptance(): void {
  const data: TermsAcceptance = { version: TERMS_VERSION, acceptedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

type TabContent = { label: string; sections: { title: string; paragraphs: string[] }[] };

const TABS: TabContent[] = [
  {
    label: "Políticas de Privacidade",
    sections: [
      {
        title: "Quais dados são coletados",
        paragraphs: [
          "O aplicativo funciona de forma offline, no próprio dispositivo da equipe. Os dados digitados pelo profissional — cadastros de pacientes, registros de atendimento, anotações da equipe e configurações do aplicativo — são o conteúdo gerado durante o uso.",
          "Não coletamos dados de localização, contatos, câmera ou microfone além das permissões estritamente necessárias às funcionalidades que você solicita (por exemplo, leitura de documentos por OCR).",
          "[Placeholder] Caso versões futuras incluam envio de dados para servidores, métricas de uso ou recursos em nuvem, esta seção será atualizada detalhando exatamente o que passará a ser coletado, sempre com aviso prévio.",
        ],
      },
      {
        title: "Como os dados são armazenados",
        paragraphs: [
          "Todos os dados permanecem armazenados localmente no dispositivo, em banco de dados cifrado (AES-GCM). No Windows (pacote da Microsoft Store), o armazenamento do aplicativo fica em pasta do próprio usuário, dentro do perfil do dispositivo.",
          "[Placeholder] Exportações manuais feitas por você (planilhas, arquivos) seguem para a pasta que você escolher e deixam de estar sob controle do aplicativo — o cuidado com esses arquivos passa a ser seu.",
        ],
      },
      {
        title: "Como os dados são utilizados",
        paragraphs: [
          "Os dados são usados apenas para exibição, edição e geração dos relatórios do dia a dia da equipe. Nada é vendido, compartilhado com terceiros para marketing ou usado para publicidade.",
          "[Placeholder] Qualquer funcionalidade futura de sincronização ou backup será opt-in (ativada por você) e descrita nesta política antes de entrar em operação.",
        ],
      },
      {
        title: "Direitos do usuário sobre os dados (LGPD/GDPR)",
        paragraphs: [
          "Você tem direito a acesso, correção, portabilidade e exclusão dos seus dados, nos termos da LGPD (Brasil) e do GDPR (UE). Como os dados são locais, a exclusão total pode ser feita limpando os dados do aplicativo nas configurações do dispositivo; para os demais pedidos, use o contato abaixo.",
          "[Placeholder] Detalhamento dos titulares e das bases legais conforme exigido pelos regulamentos de proteção de dados.",
        ],
      },
      {
        title: "Como contatar o desenvolvedor",
        paragraphs: [
          "E-mail: mmr05@hotmail.com",
          "Telefone / WhatsApp: (11) 97883-1938",
          "[Placeholder] Horário de atendimento e prazo de resposta para pedidos relacionados a dados pessoais.",
        ],
      },
    ],
  },
  {
    label: "Termos de Uso",
    sections: [
      {
        title: "Como o aplicativo funciona",
        paragraphs: [
          "O aplicativo apoia a rotina de uma equipe de saúde no cadastro, busca e acompanhamento de pacientes e registros, funcionando em grande parte offline, no dispositivo do profissional.",
          "[Placeholder] Descrição detalhada dos módulos e fluxos principais (cadastro, agenda/faxina, OCR, relatórios).",
        ],
      },
      {
        title: "Uso permitido (sem ilegalidades)",
        paragraphs: [
          "O aplicativo pode ser usado para fins profissionais legítimos da equipe, sempre em conformidade com a lei, com o sigilo profissional e com as políticas da instituição onde o serviço é prestado.",
        ],
      },
      {
        title: "O que é permitido e o que é proibido",
        paragraphs: [
          "Permitido: uso interno da equipe, backup dos seus próprios dados, ajuste de configurações e geração de relatórios para uso institucional.",
          "Proibido: usar o aplicativo para qualquer ilicitude; inserir dados de terceiros sem autorização; tentar contornar proteções ou licenciamento; revender, alugar ou redistribuir o aplicativo; realizar engenharia reversa, salvo os limites expressamente permitidos pela lei aplicável.",
        ],
      },
      {
        title: "Propriedade intelectual sobre o aplicativo",
        paragraphs: [
          "O código-fonte, a marca, o layout, os textos e os demais elementos do aplicativo pertencem ao desenvolvedor. A licença de uso não transfere nenhum direito de propriedade intelectual ao usuário.",
          "[Placeholder] Informações sobre licenças de componentes de terceiros usados no aplicativo.",
        ],
      },
      {
        title: "Prazo da versão de demonstração gratuita",
        paragraphs: [
          "A versão de demonstração é gratuita pelo prazo de 1 (um) mês, contado da primeira instalação no dispositivo. Após esse prazo, parte dos recursos pode ser bloqueada até a aquisição da versão licenciada.",
        ],
      },
      {
        title: "Como contatar para adquirir a versão licenciada",
        paragraphs: [
          "E-mail: mmr05@hotmail.com",
          "Telefone / WhatsApp: (11) 97883-1938",
          "[Placeholder] Modelos de licença, formas de pagamento e condições comerciais.",
        ],
      },
    ],
  },
  {
    label: "Aviso Legal",
    sections: [
      {
        title: "Limites de uso para manter a legalidade",
        paragraphs: [
          "O aplicativo é uma ferramenta de apoio administrativo. Ele não substitui prontuário oficial, sistemas institucionais nem o julgamento profissional. O registro feito no aplicativo deve ser acompanhado pelas obrigações legais e normativas aplicáveis à atividade da equipe.",
        ],
      },
      {
        title: "Isenção de responsabilidade por funcionalidades não projetadas",
        paragraphs: [
          "Não nos responsabilizamos por consequências decorrentes de uso do aplicativo fora do escopo para o qual foi projetado (por exemplo, automação de decisões clínicas, emissão de documentos com validade legal ou integração não prevista com outros sistemas).",
        ],
      },
      {
        title: "Isenção de responsabilidade por uso indevido",
        paragraphs: [
          "O desenvolvedor não se responsabiliza por danos causados por uso indevido do aplicativo, incluindo inserção de dados falsos ou incompletos, compartilhamento indevido do dispositivo ou da senha de acesso, cópia indevida de dados exportados e qualquer conduta que viole direitos de terceiros ou a legislação vigente.",
          "[Placeholder] Limitações de garantia e de responsabilidade conforme o Código de Defesa do Consumidor quando aplicável.",
        ],
      },
    ],
  },
];

export function TermsGate() {
  const [accepted, setAccepted] = useState(() => isTermsAccepted());
  const [exited, setExited] = useState(false);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (accepted) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [accepted]);

  const handleAgree = () => {
    saveTermsAcceptance();
    setAccepted(true);
  };

  const handleExit = async () => {
    try {
      await App.exitApp();
    } catch {
      // Capacitor indisponível (web/desktop) — segue para window.close()
    }
    window.close();
    // Se a janela não fechar (web sem window.open), tela totalmente escurecida.
    setTimeout(() => setExited(true), 250);
  };

  if (exited) return <div className="terms-exit-screen" aria-hidden="true" />;
  if (accepted) return null;

  const active = TABS[tab];

  return (
    <div className="terms-overlay" role="dialog" aria-modal="true" aria-labelledby="terms-title">
      <div className="terms-modal">
        <header className="terms-header">
          <h2 id="terms-title">Termos e Condições de Uso</h2>
          <span className="terms-version">v{TERMS_VERSION}</span>
        </header>

        <nav className="terms-tabs" role="tablist" aria-label="Seções dos termos">
          {TABS.map((t, i) => (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={tab === i}
              className={`terms-tab${tab === i ? " active" : ""}`}
              onClick={() => setTab(i)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="terms-body">
          {active.sections.map((section) => (
            <section key={section.title}>
              <h3>{section.title}</h3>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>

        <footer className="terms-footer">
          <button type="button" className="terms-exit-btn" onClick={handleExit}>
            Quero sair
          </button>
          <button type="button" className="terms-agree-btn" onClick={handleAgree}>
            Eu concordo
          </button>
        </footer>
      </div>
    </div>
  );
}
