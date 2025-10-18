# Move Markdown Reports Script
# This script moves all .md files from the root directory to the reports directory
# (except README.md which should stay in the root)

Write-Host "Moving markdown files to reports directory..." -ForegroundColor Cyan

# Get all .md files in root, excluding README.md
$mdFiles = Get-ChildItem -Path . -Filter *.md | Where-Object { 
    $_.Name -ne "README.md" -and $_.DirectoryName -eq (Get-Location).Path 
}

if ($mdFiles.Count -eq 0) {
    Write-Host "No markdown files found to move." -ForegroundColor Green
    Write-Host "Root is already clean!" -ForegroundColor Green
    exit 0
}

# Create reports directory if it does not exist
if (-not (Test-Path -Path .\reports)) {
    Write-Host "Creating reports directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path .\reports | Out-Null
}

# Move each file
$movedCount = 0
foreach ($file in $mdFiles) {
    try {
        Write-Host "Moving: $($file.Name)" -ForegroundColor Yellow
        Move-Item -Path $file.FullName -Destination .\reports\ -Force
        $movedCount++
    }
    catch {
        Write-Host "Error moving $($file.Name): $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Moved $movedCount markdown file(s) to reports directory" -ForegroundColor Green
Write-Host "Reports directory: .\reports\" -ForegroundColor Cyan
