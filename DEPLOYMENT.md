# Deployment

This site builds to static HTML (no API routes, middleware, or server
actions), so it ships as plain files served by Nginx — no Node process
required in production.

**Target:** `mariahairstylist.beauty.globaldesignerhub.com`, a tenant
subdomain on the same shared AWS EC2 box that runs the main
[Global Designer Hub](https://globaldesignerhub.com) Django platform. The
steps below add an **isolated** Nginx server block for this one subdomain
and do not touch the existing Gunicorn/Django config serving other
tenants.

## 1. Build

```bash
npm ci
npm run build
```

Static files are emitted to `out/`.

## 2. Ship to the box

Either `scp` the build output, or clone this repo on the box and build
there:

```bash
# from your machine
scp -r out/* <user>@<ec2-host>:/var/www/maria-hair-studio/out

# or, on the box
sudo mkdir -p /var/www/maria-hair-studio
cd /var/www/maria-hair-studio
git clone https://github.com/aiOakuser/maria-hair-studio.git .
npm ci
npm run build
```

## 3. Nginx

Config lives at [deploy/nginx/maria-hair-studio.conf](deploy/nginx/maria-hair-studio.conf).

```bash
sudo cp deploy/nginx/maria-hair-studio.conf /etc/nginx/sites-available/maria-hair-studio
sudo ln -s /etc/nginx/sites-available/maria-hair-studio /etc/nginx/sites-enabled/
sudo nginx -t          # validate before reloading anything live
sudo systemctl reload nginx
```

## 4. DNS

Confirm `mariahairstylist.beauty.globaldesignerhub.com` resolves (Cloudflare)
to the same EC2 IP as the rest of `*.globaldesignerhub.com`. It should
already, since it's an existing live tenant subdomain.

## 5. SSL

```bash
sudo certbot --nginx -d mariahairstylist.beauty.globaldesignerhub.com
```

Adds this subdomain to the box's cert alongside the existing ones (see the
main GDH `DEPLOYMENT.md` for the pattern — `seri.`, `volumeone.`, etc.).

## 6. Verify

```bash
curl -I https://mariahairstylist.beauty.globaldesignerhub.com
```

Should return `200`. Then load it in a browser and spot-check the service
grid, the Services/Staff tabs, and the Location & Hours footer.

## Redeploying

```bash
cd /var/www/maria-hair-studio
git pull origin master
npm ci
npm run build
sudo systemctl reload nginx   # only needed if the Nginx config itself changed
```
