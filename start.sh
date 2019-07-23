#cloud-boothook
#!/usr/bin/env bash
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1
	PATH="$PATH:/root/.nvm/versions/node/v10.16.0/bin"
	pm2 delete url-checker
	rm -rf /root/url_checker
	git clone https://github.com/leedoing/url_checker.git /root/url_checker
	cd /root/url_checker/
	yarn install
	yarn run start
	mv /root/.env /root/url_checker/.env