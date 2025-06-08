# Node.js App with Prometheus and Kubernetes

This is a simple web app made with Node.js and Express. It shows a picture of Gandalf and the current time in Colombo, Sri Lanka. It also tracks how many times each page is visited using Prometheus for monitoring. Everything is containerized using Docker and runs on a local Kubernetes setup.

---

## What This App Does

* **/gandalf** – shows a picture of Gandalf and logs each visit.
* **/colombo** – shows the current time in Colombo and logs each visit.
* **/metrics** – shows Prometheus metrics so you can monitor usage.

---

## What’s Inside (Tech Used)

| Tool                  | Why it's used                                                         |
| --------------------- | --------------------------------------------------------------------- |
| **Node.js + Express** | To build the web app                                                  |
| **prom-client**       | To track metrics                                                      |
| **Docker**            | To package the app into a container                                   |
| **Kubernetes (k8s)**  | To run the app and Prometheus                                         |
| **Prometheus**        | To collect and view metrics                                           |
| **restart.bat**       | A script to build and launch everything with one command (on Windows) |

---

## How It’s Set Up

Your computer runs:

* The app in a Docker container
* Prometheus in another container
* Kubernetes handles both of them
* Prometheus collects data from the app every 15 seconds

Port forwarding is used to access the app and Prometheus on your browser:

* App: [http://localhost:8080](http://localhost:8080)
* Prometheus: [http://localhost:9090](http://localhost:9090)

---

## How to Run It

### 1. Requirements

* Docker installed
* Kubernetes running (e.g. with Minikube or Docker Desktop)
* `kubectl` command line tool
* Windows (or you can adapt the script for other OS)

---

### 2. One-Step Start (Windows)

Just run:

```
restart.bat
```

This will:

* Build the Docker image
* Deploy everything to Kubernetes
* Start port forwarding

---

### 3. Manual Steps (If needed)

**Build Docker image:**

```bash
docker build -t gandalf-app .
```

**Deploy to Kubernetes:**

```bash
kubectl apply -f deployment.yaml
kubectl apply -f prometheus-config.yaml
kubectl apply -f prometheus-deployment.yaml
```

**Forward ports:**

```bash
kubectl port-forward svc/gandalf-service 8080:80
kubectl port-forward svc/prometheus-service 9090:9090
```

---

## Viewing Metrics in Prometheus

1. Go to [http://localhost:9090](http://localhost:9090)
2. Try searching for:

   * `gandalf_requests_total`
   * `colombo_requests_total`

You’ll see how many times each route has been used.

---

## Files in This Project

```
.
├── app.js                   # Main app with routes
├── prometheus.js            # Sets up Prometheus counters
├── Dockerfile               # Builds the app image
├── package.json             # Lists app dependencies
├── deployment.yaml          # Deploys the app to Kubernetes
├── prometheus-config.yaml   # Prometheus scrape settings
├── prometheus-deployment.yaml # Deploys Prometheus to Kubernetes
├── restart.bat              # One-click setup script (Windows)
└── README.md                # This file
```

---

## Extra Tips

* You can add more routes by editing `app.js`.
* If Prometheus isn't showing metrics, check if the pods are running:

  ```bash
  kubectl get pods
  ```
* If port 80 is in use, change it in the files or run as a different port locally.

---

## License

This project doesn't use any license.
