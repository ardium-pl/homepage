$ErrorActionPreference = "Stop"

function Invoke-Step {
    param(
        [string]$Description,
        [string]$LikelySolution,
        [scriptblock]$Command
    )

    Write-Host "`n$Description" -ForegroundColor Cyan

    try {
        $global:LASTEXITCODE = 0

        & $Command

        if ($LASTEXITCODE -ne 0) {
            throw "Command exited with code $LASTEXITCODE"
        }
    }
    catch {
        Write-Host "`nERROR: $Description failed!" -ForegroundColor Red
        Write-Host "Details: $_" -ForegroundColor Red

        if ($LikelySolution) {
            Write-Host "`nLikely solution:" -ForegroundColor Yellow
            Write-Host $LikelySolution -ForegroundColor Yellow
        }

        throw
    }
}

# Paths
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$ExportFile = Join-Path $ProjectRoot "development-export.tar.gz"
$ExportsDir = Join-Path $ProjectRoot "exports"

# Timestamped production backup
$Timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$BackupFile = Join-Path $ExportsDir "production-$Timestamp.tar.gz"

Push-Location $ProjectRoot

try {
    # 1. Create backup directory
    if (-not (Test-Path -LiteralPath $ExportsDir)) {
        New-Item -ItemType Directory -Path $ExportsDir -Force | Out-Null
    }

    # 2. Export development dataset
    Invoke-Step -Description "Exporting development dataset" -Command {
        npx sanity dataset export development $ExportFile
    }

    # 3. Back up production dataset
    Invoke-Step -Description "Backing up production dataset" -Command {
        npx sanity dataset export production $BackupFile
    }

    # 4. Verify production backup
    Invoke-Step -Description "Verifying production backup" -Command {
        if (-not (Test-Path -LiteralPath $BackupFile)) {
            throw "Production backup file was not created."
        }

        if ((Get-Item -LiteralPath $BackupFile).Length -eq 0) {
            throw "Production backup file is empty."
        }
    }

    Write-Host "Backup saved to: $BackupFile" -ForegroundColor Green

    # 5. Deploy production
    Invoke-Step -Description "Deploying production" -Command {
        npm run deploy:prod
    }

    # 6. Delete production dataset
    Invoke-Step -Description "Deleting production dataset" -Command {
        npx sanity dataset delete production --force
    }

    # 7. Recreate production dataset
    Invoke-Step -Description "Creating production dataset" -Command {
        npx sanity dataset create production --visibility public
    }

    # 8. Import development into production
    Invoke-Step -Description "Importing dataset into production" -Command {
        npx sanity dataset import $ExportFile production
    }

    Write-Host "`nSUCCESS: Development dataset copied to production!" -ForegroundColor Green
    Write-Host "Production backup: $BackupFile" -ForegroundColor Green
}
finally {
    # Always remove temporary development export
    try {
        if (Test-Path -LiteralPath $ExportFile) {
            Remove-Item -LiteralPath $ExportFile -Force -ErrorAction Stop
        }
    }
    finally {
        Pop-Location
    }
}