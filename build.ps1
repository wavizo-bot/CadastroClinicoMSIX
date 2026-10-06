$ErrorActionPreference = "Stop"

$msixDir = $PSScriptRoot
$rootDir = Split-Path -Parent $msixDir

Write-Host "Building web assets (vite)..."
Push-Location $rootDir
try {
    pnpm run build
    if ($LASTEXITCODE -ne 0) { throw "Falha no build web (pnpm run build)." }
}
finally {
    Pop-Location
}

$vswhere = "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe"
$msbuild = $null
if (Test-Path $vswhere) {
    $msbuild = & $vswhere -latest -requires Microsoft.Component.MSBuild -find "MSBuild\**\Bin\MSBuild.exe" | Select-Object -First 1
}
if (-not $msbuild) {
    $msbuild = "msbuild"
}

Write-Host "Building MSIX package..."
Push-Location $msixDir
try {
    & $msbuild CadastroClinicoMSIX.sln /p:Configuration=Release "/p:Platform=Any CPU" /p:AppxBundle=Always /p:UapAppxPackageBuildMode=StoreUpload
    if ($LASTEXITCODE -ne 0) { throw "Falha no build do pacote MSIX." }
}
finally {
    Pop-Location
}

Write-Host "Build concluido. Pacote em msix\CadastroClinicoMSIX\bin\Release\AnyCPU\Release"
