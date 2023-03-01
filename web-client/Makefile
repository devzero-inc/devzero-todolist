RWREGISTRY = 749882936473.dkr.ecr.us-east-2.amazonaws.com
APPNAME = todolist-web
REV := $(shell git rev-parse HEAD)
-include ~/.env

KUBE_NAMESPACE ?= $(shell cat /var/run/secrets/kubernetes.io/serviceaccount/namespace)


.PHONY: build
build:
	DOCKER_BUILDKIT=1 docker build --platform linux/amd64  -t ${RWREGISTRY}/${APPNAME}:$(REV) -t ${RWREGISTRY}/${APPNAME}:latest ./

.PHONY: push
push: ecr_login
	docker push ${RWREGISTRY}/${APPNAME}:$(REV)
	docker push ${RWREGISTRY}/${APPNAME}:latest

.PHONY: ecr_login
ecr_login:
	aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 749882936473.dkr.ecr.us-east-2.amazonaws.com

.PHONY: deploy
deploy:
	kubectl delete deployment/${APPNAME} -n $(KUBE_NAMESPACE) || true
	kubectl delete service/${APPNAME} -n $(KUBE_NAMESPACE) || true
	export REV=latest && envsubst < ../python-todolist-app-k8s/todolist-web-deployment.yaml | kubectl -n $(KUBE_NAMESPACE) apply -f - 
	kubectl -n $(KUBE_NAMESPACE) apply -f ../python-todolist-app-k8s/todolist-web-service.yaml

.PHONY: mysqlsh
mysqlsh:
	mysql -h 127.0.0.1 -P 32000 -uroot -proot -Dtodolist-app