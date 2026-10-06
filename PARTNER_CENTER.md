# Microsoft Partner Center — Preparação da Submissão
**App:** Cadastro Clínico · **Guia de trabalho** (manter atualizado junto com `log.txt`)

---

## 1. Identidade do pacote (já configurada em `CadastroClinicoMSIX/Package.appxmanifest`)

| Campo | Valor |
|---|---|
| Package/Identity/Name | `wavizo.CadastroClnico` |
| Package/Identity/Publisher | `CN=57BB464E-553F-45B6-A4ED-B253157408EB` |
| Package/Properties/PublisherDisplayName | `wavizo` |
| Package Family Name (PFN) | `wavizo.CadastroClnico_c5p81jb0en0bm` |
| Package SID | `S-1-15-2-2847593193-4293426457-1784438407-1723172423-4006318822-2270365518-2666157207` |
| Store ID | `9P88RMK5TDSB` |
| Versão | `1.0.7.0` (igual ao `version` do `package.json` — incrementar a cada submissão: Maior.Menor.Patch.Compilação) |

Repositórios:
- Windows (MSIX): https://github.com/wavizo-bot/CadastroClinicoMSIX.git
- Android/Web: https://github.com/wavizo-bot/CadastroClinico.git

## 2. Política de privacidade (obrigatória nesta submissão)

**Resposta em Properties → "Este produto acessa, coleta ou transmite informações pessoais?": SIM.**
(Motivo honesto: o app *armazena* dados pessoais digitados pelo usuário — nome, CPF/CNS, endereço — no IndexedDB local. Não *transmite* nada a servidores.) Com "Sim", o Partner Center **exige a URL da política de privacidade**.

- **Arquivo-fonte:** `client/public/politica-privacidade.html` (vira `dist/public/politica-privacidade.html` no build; já atualizado para citar Android + Windows)
- **Campo no Partner Center:** Properties → Privacy policy URL (precisa ser `https://` público)
- **Declaração para o campo de texto / notas (copiar e colar):**

> O Cadastro Clínico não coleta, não transmite e não compartilha dados pessoais com terceiros. Não há conta, login, servidor, analytics, anúncios ou SDKs de terceiros. Os dados digitados pelo usuário (fichas de clientes) ficam somente no armazenamento local do dispositivo (IndexedDB cifrado com AES-GCM e chave gerada no próprio dispositivo). O app funciona offline; o acesso à internet do pacote (`internetClient`) serve apenas para abrir links externos opcionais (ex.: WhatsApp) por ação do usuário. O usuário pode apagar todos os dados a qualquer momento no app (Banco de Dados → Reiniciar) ou desinstalando. Contato de privacidade: mmr05@hotmail.com. Política completa: `<URL-HTTPS>`.

**Hospedagem da URL (pendência):** nenhum dos repositórios tem GitHub Pages ativo hoje. Opções:
1. GitHub Pages no repositório Windows → `https://wavizo-bot.github.io/CadastroClinicoMSIX/politica-privacidade.html`
2. GitHub Pages no repositório Android → `https://wavizo-bot.github.io/CadastroClinico/politica-privacidade.html`
3. Domínio próprio (se existir)

Enquanto a URL não existir, a submissão **não pode ser concluída** (campo obrigatório).

## 3. Checklist de submissão no Partner Center

Ordem das telas (docs Microsoft, app MSIX): **Pricing and availability → Properties → Age ratings → Packages → Store listings → Submission options → Submit for certification**.

### 3.1 Pricing and availability
- Preço: **Grátis** (sem compras internas, sem anúncios)
- Mercados: todos (padrão), data de disponibilidade: automática

### 3.2 Properties
- **Categoria:** `Productivity` (Produtividade) — mesma família usada na Play ("Produtividade / Ferramentas"). Não usar Saúde.
- Subcategoria/Secundária: opcional
- **"Este produto acessa, coleta ou transmite informações pessoais?": Sim** → colar **Privacy policy URL** (seção 2)
- Website: opcional; Contato/suporte: **mmr05@hotmail.com**
- Product declarations: "depende de drivers não-Microsoft" = **Não**; "testado para acessibilidade" = Não (se não testou); "suporta caneta" = Não
- **Notes for certification (copiar e colar):**
  > Aplicativo 100% offline que carrega interface de arquivos locais embutidos no pacote (WebView2). A capacidade `internetClient` é usada apenas para abrir links externos opcionais (WhatsApp) por ação do usuário. Nenhum dado é transmitido a servidores. Sem backend, sem anúncios, sem compras.
- System requirements: nenhuma exigência especial (WebView2 Runtime já é pré-instalado no Win 10/11 atualizado)
- Restricted capabilities: **nenhuma** declarada

### 3.3 Age ratings (IARC — todas as perguntas obrigatórias)
- **Reutilizar o rating da Google Play:** se o Play Console já gerou um ID IARC (Configurações → Classificação de conteúdo), escolha "fornecer meu rating ID" e evite refazer o questionário.
- Senão, responder o questionário: categoria **Productivity/Business**; sem violência, sem conteúdo sexual, sem drogas/armas, sem apostas, sem linguagem ofensiva, sem conteúdo gerado por usuários, sem navegador interto/compras, sem médico/instrutivo. Público-alvo: adultos (18+).

### 3.4 Packages
- Gerar o pacote nesta máquina: `.\msix\build.ps1` (requer instalar **.NET 8 SDK** + VS 2022 workload — ver pendências)
- Upload do `.msixbundle` gerado em `msix\CadastroClinicoMSIX\bin\Release\AnyCPU\Release\`
- Microsoft **re-assina** o MSIX automaticamente — certificado próprio não é necessário
- "What's new in this version" (limite 1500 caracteres): descrever as mudanças da versão 1.0.7

### 3.5 Store listings (por idioma: pt-BR)
- **Nome (obrigatório):** Cadastro Clínico
- **Descrição (obrigatória, ≤10.000):** reaproveitar `PLAY_STORE_LISTING.txt` (seção "Descrição completa"), trocando "aparelho" por "aparelho/computador" e acrescentando "funciona também no Windows via Microsoft Store".
- **Recursos/Features (≤20 itens, ≤200 caracteres cada)** — sugestão pronta:
  1. 100% offline — sem conta, sem login, sem nuvem; dados só no seu dispositivo
  2. Fichas completas: nome, mãe, nascimento, endereço, CNS/CPF e telefones
  3. Atalho opcional para WhatsApp com um toque
  4. Território por ruas e equipes com faixas, pares/ímpares e listas
  5. Funcionamento da unidade com setores organizados
  6. Importação de CSV modelo de 3 arquivos cruzados (CNS/CPF/nome+nascimento)
  7. Exportação em JSON único para você compartilhar do seu jeito
  8. Criptografia local AES-GCM com chave gerada no dispositivo
  9. Senha opcional de 4 caracteres escolhida por você
  10. Leitura óptica local (Tesseract embutido) — imagem nunca sai do dispositivo
- **Screenshots (obrigatório ≥1, recomendado 4+):** PNG, **mínimo 1366×768**, máx 3840×2160, ≤50 MB, paisagem ou retrato, até 10 desktop. **PENDENTE** (capturar da janela do app em Windows — o wrapper precisa ser compilado primeiro)
- **1:1 App tile icon (300×300 PNG):** pronto em `msix/listing/store-tile-300x300.png`
- Store logos extras: opcionais (recomendados para boa exibição)

### 3.6 Submission options
- Notas de certificação: opcional (o texto da seção 3.2 já cobre)
- Publicação: automática após certificação (ou agendar)

## 4. Pendências antes de submeter

| # | Pendência | Status |
|---|---|---|
| 1 | Instalar .NET 8 SDK (+ VS 2022 com ".NET desktop development") nesta máquina e rodar `.\msix\build.ps1` | Bloqueado (sem SDK) |
| 2 | Capturar screenshots desktop (1366×768+) do app compilado | Depende do item 1 |
| 3 | Publicar `politica-privacidade.html` em URL HTTPS (GitHub Pages ou domínio) e preencher no Partner Center | Decisão pendente |
| 4 | Confirmar/obter o rating IARC (reaproveitar ID da Play) | Pendente (conta Partner Center) |
| 5 | Incrementar versão no manifesto a cada nova submissão | Rotina |

## 5. Arquivos de apoio

- `msix/listing/store-tile-300x300.png` — tile 300×300 gerado do logo
- `msix/CadastroClinicoMSIX/Assets/*.png` — todos os logos do manifesto (gerados em 05/10/2026: StoreLogo 50×50, Square44x44, Square150x150, Wide310x150, SplashScreen 620×300 — StoreLogo era JPEG renomeado, corrigido)
- `PLAY_STORE_LISTING.txt` — textos da listagem (fonte para seção 3.5)
- `PLAY_DATA_SAFETY.txt` — respostas equivalentes da Play (base para seções 2 e 3.3)
- `client/public/politica-privacidade.html` — política de privacidade (fonte única)
