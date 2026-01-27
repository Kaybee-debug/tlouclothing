# Instructions to Push Clean Nuxt Project to Remote Repository

## Step 1: Remove Git Lock File (if exists)
Open PowerShell or Command Prompt in the project directory and run:
```bash
Remove-Item -Path ".git/index.lock" -Force -ErrorAction SilentlyContinue
```

## Step 2: Stage All Changes
```bash
git add -A
```

## Step 3: Commit Changes
```bash
git commit -m "Convert to Nuxt 3: Remove old frontend folder, migrate to Nuxt, connect all features to database"
```

## Step 4: Force Push to Override Remote
```bash
git push origin main --force
```

**Note:** You may be prompted for credentials. Use your Git server credentials for `http://192.168.10.66:3000`

## Alternative: If you want to verify before pushing
```bash
# Check what will be pushed
git status

# See the commit
git log -1

# Then force push
git push origin main --force
```

## What This Will Do:
- ✅ Remove all old frontend folder files from the repository
- ✅ Add all new Nuxt 3 files
- ✅ Override everything on the remote `main` branch
- ✅ Clean up the repository to only contain the Nuxt project

## Important:
The `--force` flag will **completely override** the remote branch. Make sure you want to do this before running the command.
