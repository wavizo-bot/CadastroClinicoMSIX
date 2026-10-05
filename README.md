# Cadastro Clinico MSIX

Pacote MSIX do aplicativo Cadastro Clínico para a Microsoft Store.

## Estrutura do Projeto

- `CadastroClinicoMSIX/` - Projeto C# WinForms com WebView2
- `web/` - Assets web compilados (Vite build)
- `Assets/` - Ícones e imagens para o pacote MSIX

## Pré-requisitos

- Windows 10/11
- Visual Studio 2022 com workload:
  - ".NET desktop development"
  - "Desktop development with C++" (para ferramentas MSIX)
- .NET 8 SDK
- WebView2 Runtime (instalado automaticamente na maioria dos Windows 10/11)

## Build

```powershell
.\build.ps1
```

Ou manualmente:

```powershell
cd "Cadastro Clinico"
pnpm run build
cd ..
cd CadastroClinicoMSIX
msbuild CadastroClinicoMSIX.sln /p:Configuration=Release /p:Platform=x64 /p:AppxBundle=Always /p:UapAppxPackageBuildMode=StoreUpload
```

O pacote MSIX será gerado em `CadastroClinicoMSIX\bin\Release\x64\Release`.

## Identidade do Pacote

- **Nome:** wavizo.CadastroClnico
- **Publisher:** CN=57BB464E-553F-45B6-A4ED-B253157408EB
- **PublisherDisplayName:** wavizo
- **PFN:** wavizo.CadastroClnico_c5p81jb0en0bm
- **Package SID:** S-1-15-2-2847593193-4293426457-1784438407-1723172423-4006318822-2270365518-2666157207
- **Store ID:** 9P88RMK5TDSB

## Submissão na Microsoft Store

1. Gere o pacote MSIX usando o script de build
2. Acesse o [Microsoft Partner Center](https://partner.microsoft.com/)
3. Crie um novo app ou selecione o app existente com ID `9P88RMK5TDSB`
4. Na seção "Pacotes", faça upload do arquivo `.msixbundle` gerado
5. Complete as informações da listagem da loja e envie para certificação

## Notas

- Os ícones em `Assets/` devem ser gerados nas dimensões corretas antes do build
- O app carrega os arquivos web da pasta `web/` usando WebView2
- Não há servidor backend no pacote MSIX; todos os dados são armazenados localmente
