# PowerShell script to push clean Nuxt project to remote repository
# Run this script from the project root directory

Write-Host "Removing git lock file if exists..." -ForegroundColor Yellow
Remove-Item -Path ".git/index.lock" -Force -ErrorAction SilentlyContinue

Write-Host "Staging all changes..." -ForegroundColor Yellow
git add -A

Write-Host "Checking status..." -ForegroundColor Yellow
git status --short

Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Convert to Nuxt 3: Remove old frontend folder, migrate to Nuxt, connect all features to database"

Write-Host "Force pushing to remote..." -ForegroundColor Yellow
Write-Host "WARNING: This will override everything on the remote main branch!" -ForegroundColor Red
$confirm = Read-Host "Type 'yes' to continue"

if ($confirm -eq 'yes') {
    git push origin main --force
    Write-Host "Push completed!" -ForegroundColor Green
} else {
    Write-Host "Push cancelled." -ForegroundColor Yellow
}
