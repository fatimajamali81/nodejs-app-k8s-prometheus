@echo off

:: Build the Docker image
docker build -t gandalf-app .

:: Apply Kubernetes resources
kubectl apply -f deployment.yaml
kubectl apply -f prometheus-deployment.yaml
kubectl apply -f prometheus-config.yaml

:: Wait for pods to be ready
timeout /t 10 /nobreak >nul

:: Start port forwarding
start cmd /k "kubectl port-forward svc/gandalf-service 8080:80"
start cmd /k "kubectl port-forward svc/prometheus-service 9090:9090"

echo Ready! Access:
echo App: http://localhost:8080
echo Prometheus: http://localhost:9090
pause
