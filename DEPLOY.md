# Deployment Guide

## First-time server setup

SSH into your Hetzner server and run these once:

```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone the repo
sudo mkdir -p /var/www/foerderfinder
sudo chown $USER:$USER /var/www/foerderfinder
cd /var/www/foerderfinder
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git .

# Create the .env file for the backend
nano backend/.env
# Add: GEMINI_API_KEY=your_key_here

# Build frontend
cd frontend && npm ci && npm run build && cd ..

# Install backend deps & start with PM2
cd backend && npm ci
pm2 start index.js --name foerderfinder-api
pm2 save
pm2 startup   # follow the printed command to auto-start on reboot
```

## Nginx setup

```bash
# Copy the nginx config
sudo cp /var/www/foerderfinder/nginx.conf /etc/nginx/sites-available/foerderfinder

# Edit it — replace YOUR_DOMAIN_HERE with your actual domain
sudo nano /etc/nginx/sites-available/foerderfinder

# Enable it
sudo ln -s /etc/nginx/sites-available/foerderfinder /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## HTTPS with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## GitHub Actions setup (auto-deploy)

Go to your repo → **Settings → Secrets and variables → Actions** and add:

| Secret | Value |
|---|---|
| `SERVER_HOST` | Your server IP (e.g. `123.456.789.0`) |
| `SERVER_USER` | SSH username (e.g. `root` or your user) |
| `SERVER_SSH_KEY` | Your private SSH key (contents of `~/.ssh/id_rsa`) |

To generate an SSH key pair if you don't have one:
```bash
ssh-keygen -t ed25519 -C "github-actions"
# Add the PUBLIC key to your server: ~/.ssh/authorized_keys
# Add the PRIVATE key as the SERVER_SSH_KEY secret in GitHub
```

After this, every `git push` to `main` will automatically deploy.

## Local development

```bash
# Terminal 1 — backend
cd backend
cp ../.env.example .env   # fill in your GEMINI_API_KEY
npm install
npm run dev

# Terminal 2 — frontend
cd frontend
npm install
npm run dev
# Opens at http://localhost:5173
```
