# Deployment

This site runs as a long-lived Next.js server (`next start`), managed by
systemd, and reverse-proxied by Nginx — not a static export.

**Target:** `maria-hair-studio.beauty.globaldesignerhub.com`, a tenant
subdomain on the same shared AWS EC2 box that runs the main
[Global Designer Hub](https://globaldesignerhub.com) Django platform. The
app is isolated from the other tenants: its own systemd unit, its own
Nginx server block, its own port (`8015`, bound to `127.0.0.1` only).

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
Environment=PORT=8015
Environment=HOSTNAME=127.0.0.1

ExecStart=/opt/nodejs22/bin/npm start

Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

`npm start` runs `next start`, which serves the regular (non-static)
`.next` build produced by `npm run build`. The app only listens on
`127.0.0.1:8015` — it's not reachable directly, only via the Nginx proxy.

Next.js 16 requires Node ≥20.9; the box's default `npm` on `$PATH` (as of
this writing, Node 18.19.1 / npm 9.2.0) is too old and will silently
produce a broken `node_modules` (missing/unusable `next` bin) if used for
a manual `npm ci` / `npm run build`. Always use the same Node 22 install
the service runs (`/opt/nodejs22/bin/npm`), as `www-data`, so the build
matches what systemd will execute and file ownership stays correct.

## 3. Nginx

Config lives at `/etc/nginx/sites-available/maria` on the box (SSL
details are box-specific, so this isn't checked into the repo):

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name maria-hair-studio.beauty.globaldesignerhub.com;

    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;

    server_name maria-hair-studio.beauty.globaldesignerhub.com;

    ssl_certificate /etc/letsencrypt/live/maria-hair-studio.beauty.globaldesignerhub.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/maria-hair-studio.beauty.globaldesignerhub.com/privkey.pem;

    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:8015;

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

`maria-hair-studio.beauty.globaldesignerhub.com` resolves (Cloudflare) to
the same EC2 IP as the rest of `*.globaldesignerhub.com`.

## 5. SSL

Already issued via certbot for this subdomain, alongside the other
`*.globaldesignerhub.com` tenants.

## Redeploying

```bash
cd /var/www/maria-hair-studio
git pull origin maria-hair-studio-mvp
sudo -u www-data env PATH="/opt/nodejs22/bin:$PATH" npm ci
sudo -u www-data env PATH="/opt/nodejs22/bin:$PATH" npm run build
sudo systemctl restart maria-hair-studio
```

`systemctl restart` is required (not just an Nginx reload) since the
running Node process needs to pick up the new build.

**`PATH`, not just the binary path, matters.** `npm` is a JS file starting
with `#!/usr/bin/env node`, so even invoking it by full path
(`/opt/nodejs22/bin/npm`) still lets the shebang's own `env node` lookup
fall through to whatever `node` is first on `$PATH` — which on this box is
the system's Node 18, too old for Next 16 (>=20.9 required) and silently
produces a broken `node_modules` (missing/unusable `next` bin). Always
prepend `/opt/nodejs22/bin` to `PATH` as shown above rather than calling
the binary by path alone.

**Never run `npm ci`/`npm run build` as root.** The service runs as
`www-data`; a root-run install leaves root-owned files in `node_modules`
that a later `www-data` install can't clean up (`EACCES` on `rmdir`). If
that happens: `sudo chown -R www-data:www-data /var/www/maria-hair-studio`
before retrying. `www-data` also needs a writable npm cache/home — if
`/var/www/.npm` doesn't exist yet or isn't `www-data`-owned, create it
(`sudo mkdir -p /var/www/.npm && sudo chown -R www-data:www-data
/var/www/.npm`); this is scoped to that one directory, not all of
`/var/www`, which hosts other tenants on this box.

## Verify

```bash
curl -I https://maria-hair-studio.beauty.globaldesignerhub.com
sudo systemctl status maria-hair-studio
```

Should return `200` and `active (running)`. Then load it in a browser
and spot-check the service grid, the Services/Staff tabs, and the
Location & Hours footer.
