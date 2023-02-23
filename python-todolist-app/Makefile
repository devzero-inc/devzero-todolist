run:
	docker-compose build --no-cache
	docker-compose up --force-recreate --renew-anon-volumes

mysqlsh:
	mysql -h 127.0.0.1 -P 32000 -uroot -proot -Dtodolist-app
