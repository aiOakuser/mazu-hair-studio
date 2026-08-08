# Deployment

This site runs as a long-lived Next.js server (`next start`), managed by
systemd, and reverse-proxied by Nginx — not a static export.

**Target:** `mariahairstylist.beauty.globaldesignerhub.com`, a tenant
subdomain on the same shared AWS EC2 box that runs the main
[Global Designer Hub](https://globaldesignerhub.com) Django platform. The
app is isolated from the other tenants: its own systemd unit, its own
Nginx server block, its own port (`8020`, bound to `127.0.0.1` only).

## 1. Layout on the box

```text
/var/www/maria-hair-studio/     # repo checkout, built in place
```

## 2. systemd service

Unit file: `/etc/systemd/system/maria-hair-studio.service`

```ini
[Unit]
Description=Maria Hair Studio Next.js Application
After=network.target

[Service]
Type=simple

User=www-data
Group=www-data

WorkingDirectory=/var/www/maria-hair-studio

Environment=NODE_ENV=production
Environment=PORT=8020
Environment=HOSTNAME=127.0.0.1

ExecStart=/usr/bin/npm start

Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

`npm start` runs `next start`, which serves the regular (non-static)
`.next` build produced by `npm run build`. The app only listens on
`127.0.0.1:8020` — it's not reachable directly, only via the Nginx proxy.

## 3. Nginx

Config lives at `/etc/nginx/sites-available/maria` on the box (SSL
details are box-specific, so this isn't checked into the repo):

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name mariahairstylist.beauty.globaldesignerhub.com;

    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;

    server_name mariahairstylist.beauty.globaldesignerhub.com;

    ssl_certificate /etc/letsencrypt/live/mariahairstylist.beauty.globaldesignerhub.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mariahairstylist.beauty.globaldesignerhub.com/privkey.pem;

    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:8020;

        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_read_timeout 120s;
        proxy_connect_timeout 60s;
    }
}
```

## 4. DNS

`mariahairstylist.beauty.globaldesignerhub.com` resolves (Cloudflare) to
the same EC2 IP as the rest of `*.globaldesignerhub.com`.

## 5. SSL

Already issued via certbot for this subdomain, alongside the other
`*.globaldesignerhub.com` tenants.

## Redeploying

```bash
cd /var/www/maria-hair-studio
git pull origin maria-hair-studio-mvp
npm ci
npm run build
sudo systemctl restart maria-hair-studio
```

`systemctl restart` is required (not just an Nginx reload) since the
running Node process needs to pick up the new build.

## Verify

```bash
curl -I https://mariahairstylist.beauty.globaldesignerhub.com
sudo systemctl status maria-hair-studio
```

Should return `200` and `active (running)`. Then load it in a browser
and spot-check the service grid, the Services/Staff tabs, and the
Location & Hours footer.
