@echo off
echo Building Cadastro Clinico MSIX...
echo.

REM Build the web assets first
cd ..
cd "Cadastro Clinico"
call pnpm run build
cd ..
cd CadastroClinicoMSIX

echo.
echo Building MSIX package...
msbuild CadastroClinicoMSIX.sln /p:Configuration=Release /p:Platform=x64 /p:AppxBundle=Always /p:UapAppxPackageBuildMode=StoreUpload

echo.
echo Build complete. Check the bin\Release\x64\Release folder for the MSIX package.
pause
