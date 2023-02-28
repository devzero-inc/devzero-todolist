RWREGISTRY = 749882936473.dkr.ecr.us-east-2.amazonaws.com
APPNAME = python-todolist-app
REV := $(shell git rev-parse HEAD)
-include ~/.env

KUBE_NAMESPACE ?= $(shell cat /var/run/secrets/kubernetes.io/serviceaccount/namespace)

.PHONY: run
run:
	docker-compose build --no-cache
	docker-compose up --force-recreate --renew-anon-volumes

.PHONY: build
build:
	DOCKER_BUILDKIT=1 docker build --platform linux/amd64  -t ${RWREGISTRY}/${APPNAME}:$(REV) app/

.PHONY: push
push: ecr_login
	docker push ${RWREGISTRY}/${APPNAME}:$(REV)

.PHONY: ecr_login
ecr_login:
	aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 749882936473.dkr.ecr.us-east-2.amazonaws.com

.PHONY: deploy
deploy:
	kubectl delete deployment/todolist-app -n $(KUBE_NAMESPACE) || true
	export REV=$(REV) && envsubst < ../todolist-app-deployment.yaml | kubectl -n $(KUBE_NAMESPACE) apply -f - 

.PHONY: mysqlsh
mysqlsh:
	mysql -h 127.0.0.1 -P 32000 -uroot -proot -Dtodolist-app