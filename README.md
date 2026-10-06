# Cadastro Clínico — MSIX / Microsoft Store (espelho)

Este repositório é um **espelho** da pasta `msix/` do projeto unificado
[`wavizo-bot/CadastroClinico`](https://github.com/wavizo-bot/CadastroClinico)
(fonte única de verdade — web, Android e Windows). Ele também hospeda a
**política de privacidade** usada na submissão do Partner Center.

- **Política de privacidade (GitHub Pages):**
  https://wavizo-bot.github.io/CadastroClinicoMSIX/politica-privacidade.html
- **Guia de submissão:** veja [`PARTNER_CENTER.md`](./PARTNER_CENTER.md)

## Estrutura

- `CadastroClinicoMSIX/` — projeto C# WinForms (.NET 8) + WebView2
- `CadastroClinicoMSIX/Assets/` — logos do manifesto (todos PNG, gerados 05/10/2026)
- `CadastroClinicoMSIX.sln` — solution
- `build.ps1` — build completo (web + MSIX) — **rodar no projeto unificado**
- `listing/store-tile-300x300.png` — 1:1 App tile para o Store listing
- `politica-privacidade.html` — política de privacidade (arquivo publicado no Pages)

## Build (no projeto unificado, não neste espelho)

Na raiz de `Cadastro Clinico/`:

```powershell
.\msix\build.ps1
```

O script executa `pnpm run build` (gera `dist/public/`) e depois o MSBuild.
O `.csproj` referencia `..\..\dist\public\**\*` e leva os arquivos para `web\`
no diretório de saída — não há cópia de build versionada.

## Identidade do pacote

- **Name:** wavizo.CadastroClnico
- **Publisher:** CN=57BB464E-553F-45B6-A4ED-B253157408EB
- **PublisherDisplayName:** wavizo
- **PFN:** wavizo.CadastroClnico_c5p81jb0en0bm
- **Store ID:** 9P88RMK5TDSB
- **Versão:** 1.0.7.0

## Hospedar a política (GitHub Pages)

Se ainda não estiver ativo: repo → **Settings → Pages → Source: Deploy from a
branch → Branch: `main` / root → Save**. A URL acima fica disponível em ~1 min.
