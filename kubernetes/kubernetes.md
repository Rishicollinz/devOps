# KUBERNETES:

**Architecture:**

![Kubernetes Architecture](https://kubernetes.io/images/docs/kubernetes-cluster-architecture.svg)
[Pawan elthepu Github kubernetes resources](https://github.com/pelthepu/Kubernetes.git)
---
**Some Commands**
1. To use various context || To get all the available context:
    - `kubectl config get-contexts`

2. To switch between context:
    - `kubectl config use-context <contextName>`
##
**Index**

- Wrote on new note
![Pavan Elthepu - Master Kubernetes](https://www.youtube.com/playlist?list=PLrMP04WSdCjrkNYSFvFeiHrfpsSVDFMDR)
- what is kubernetes = 1
- problem statement and features = 1
- kubernetes alternatives = 2
- kubernetes architecture = 2
- Master Node components = 3
- Worker Node components = 5
- Kubernetes set up (local,cloud) = 6
- Prerequisites = 7
- Set up = here
- Kubectl syntax = 7
- Common Commands = here
- Introduction to yaml = here
- All about pods | Deploying Nginx to kubernetes = here
- Introduction to pods, why, definition, scaling, pod communication = 8, 9
- Pod - creation, Filtering, Details, Getting into pod, port forwarding, logs, Deletion = here
- ReplicaSet - Syntax = here
- Deployment - Scaling, Rollout, Rollback, Change-cause = here
- Service types = here
    - Diagram = 10
    - Cluster Ip
    - NodePort 
    - Load Balancer
    - Multi port services.

- Ingress = here
    - Diagram = 10
    - Definition
    - Key concepts
    - Why
    - Ingress rules
    - Ingress Controller
    - Setup
    - Hands on
    - Path based routing
    - Host based routing
    - own root certificate

- Volumes:
    - Definition = 11
    - Problem statement = 11
    - Types of volumes = here

- Statefulsets:
    - Stateful vs stateless = 12
    - Problem statement = 12
    - Deployment vs statefulset = 13
    - Hands-on = here
    - statefulset deploy with sc = here
    - replication between master and worker mongo pod using headless service = here

- Configmaps: here
    - syntax
    - Normal usage
    - usage as a file using volume and volumemount

- Secret: here
    - Definition
    - Types 
    - Usage

- Probe: here
    - Causes
    - Probing mechanisms
    - Probing customizations
    - Liveness Probe
    - Readiness Probe
    - Startup Probe
    - Best practices

- Resource Managements = here
    - Computing Resources
    - Requests
    - Limits
    - Memory Management
    - QoS
    - Limit range
    - Resource Quota

- Advanced Scheduling:
    - Definition = 15
    - k8s scheduler working = 15
    - nodeName = here
    - nodeSelector = here
    - nodeAffinity = here
    - podAffinity = here
    - podAntiAffinity = here
    - Taints and Tolerations = here

- Auto-Scaling:
    - Definition = 16
    - Types of Auto-Scalers = 16
    - HPA - Architecture = 16
    - HPA - Hands on = here
    - Formula for allocation = 17
    - VPA - Architecture = 17
    - VPA - Handson = 17
    - Cluster Auto = here (only theory no implementation)

- RBAC:
    - Definition = here and 18
    - Types = 18
    - Creating User = here
    - Role and Role binding = here
    - Cluster role and cluster role binding = here
    - Group = here
    - Service-Account = here

- Daemonsets:
    - Definition = 19
    - Usecases = 19
    - Prometheus Node exporter = 20
    - Syntax and hands on = here
    

### SET UP:

1. Installed kubectl:https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/#install-using-native-package-management

2. Installed minikube:https://minikube.sigs.k8s.io/docs/start/
    - `minikube version // to check version of minikube`

    - we have installed only minikube and not the cluster.

3. Creating cluster:
    - To create a cluster:
        - `minikube start`
    - To create multi-node cluster:
        - `minikube start --nodes 2 -p local-cluster --driver=docker`
        - '-p' denotes the name of the cluster
        - '--driver' there are various drivers like vm,docker,containerd and so on.
    - To check the status of the running cluster:
        ```bash
            $ minikube status -p local-cluster
            o/p:
            local-cluster
            type: Control Plane
            host: Running
            kubelet: Running
            apiserver: Running
            kubeconfig: Configured

            local-cluster-m02
            type: Worker
            host: Running
            kubelet: Running
        ```
---
### Common Commands:
1. `kubectl get nodes`
    - To get nodes in a cluster
        ```bash
            $ kubectl get nodes
            NAME                STATUS   ROLES           AGE   VERSION
            local-cluster       Ready    control-plane   15m   v1.28.3
            local-cluster-m02   Ready    <none>          14m   v1.28.3
        ```

2. `docker ps` - to see the nodes as a docker running container.

3. `kubectl config get-contexts` - to list all the available clusters.
    ```bash
        kubectl config get-contexts
        CURRENT   NAME             CLUSTER          AUTHINFO         NAMESPACE
                docker-desktop   docker-desktop   docker-desktop   
        *         local-cluster    local-cluster    local-cluster    default
    ```

4. `kubectl config set-context <cluster-name>`

5. `minikube node add (--worker||--master) -p <cluster-name>` - to add a cluster to a node

6. `minikube node delete <node-name> -p <cluster-name>` - to delete a node

7. `minikube dashboard --url -p local-cluster` -  to see the dashboard
---
### Introduction to Yaml:

- Most of the configuration are written in yaml

- Yaml Ain't Markup Language

- Markup Language(HTML) is used for visually distinguisable content.

- Yaml is a serialization language.

- When we want to send a data from one system to another. we send it over the network. we convert it to binary and send it.

- The receiving system may not reconstruct the exact data it received because of the different os and languages between source and destination system.

- So the data must be sent in a format that can be understood by both machines. so we convert the data into commonly understandable language rather than binary directly.

- Those common format are known as serialization languages. The process is serialization and deserialization is reverse process.

- Serialization languages are json,xml,yaml.

- Yaml is data-oriented and config files are written in yaml because of readability and user friendly.

Refer: sample.yaml

**Basic Syntax:**
1. create a file with ".yaml or .yml" extension.

2. key:<space> value
```yaml
name: local-cluster
```

3. Boolean 
```yaml
isActive: true
```

4. String:
    - Double quotes
    - Single quotes
    - No quotes
    - Any character is string
    ```yaml
    name: "localcluster"
    name: localcluster
    name: 'localcluster'
    ```

5. Date 
    ```yaml
    createdAt: 2021-09-25 21:11:15
    ```

6. Integer:
    - Any number is integer

7. Explicit data type declaration:
    `version: !!str 1.22.1`

8. Scalars: Simple values like strings, numbers, or booleans
```yaml
string: "Hello, World!"
integer: 25
float: 3.14
boolean: true
```

9. Lists: Collection of items
```yaml
fruits:
  - Apple
  - Banana
  - Cherry
```

10. Dictionaries(Mapping): Key-value pairs
```yaml
person:
  name: John
  age: 30
  married: true
```
11. Indentation:
    - Indentation is critical in YAML. It indicates hierarchy and nesting. Spaces are used for indentation (not tabs).

12. Comments:
```yaml
# This is a comment
name: Alice # This is another comment
```

13. Multiline Strings:
```yaml
folded_string: >
  This is a folded
  multiline string.

preserved_string: |
  This is a preserved
  multiline string.
```

14. Anchors and Aliases:
- Reuse parts of your YAML Structure:
    ```yaml
    defaults: &defaults
    adapter: postgres
    host: localhost

    development:
    <<: *defaults
    database: dev_db

    production:
    <<: *defaults
    database: prod_db
    ```

15. Null:
    ```yaml
    empty_value: null
    another_empty: ~
    ```

16. Multiple documents:
    ```yaml
    name: cluster-1
    createdAt: 2024-01-22
    --- #below this is a new documents
    name: configmap
    ```

---
### Pods

**Creating pod with kubectl:**
- Nginx image

- Creation:
    - `kubectl run <pod_name> --image=<image_name>`
    - `kubectl run nginx-pod --image=nginx`

- Remember and running various kubectl commands and managing them is not feasible, so we generally use config files of yaml.

Folder: /home/rishikeshb/Documents/DevOps/kubernetes

- Create a nginx-pod.yaml

- In every kubernetes config files, these four attributes are mandatory,
    - ```yaml
        apiVersion:
        kind:
        metadata:
        spec:
        ```
    
    - apiVersion: 
        - It is the version of the kubernetes api to create an object.
        - It varies from resource to resource. For pods v1.
        - check apiVersion using `kubectl api-resources | grep pods`
        - o/p: 
            - ```bash
                pods                              po           v1                                     true         Pod
                ```
    - kind: 
        - Kind is the type of object
        - The last column is the kind which we got from `kubectl api-resources`
    
    - metadata:
        - It is the information about the object like resource name, labels extra.
        - We can filter the pods using the label.
        ```yaml
            name: nginx-pod
            labels:
                team: devops
                app: nginxapp
        ```
    
    - Spec:
        - Spec varies from object to object.
        - For pod, we should mention the list of containers that should go into the pods.
        ```yaml
            spec:
                containers:
                    - name: nginx-container
                      image: nginx:latest
                      ports:
                        - containerPort: 80
        ```
**Deleting a Pod:**
- `kubectl delete pod <pod_name>`

**Filter pods**
- with labels, we can filter the pods.
- `kubectl get pods -l team=devops`
- Multiple label filter:
    - `❯  kubectl get pods -l team=devops,app=nginxapp`

**Details of pod**
- `kubectl get pods nginx-pod2 -o wide`
- NAME         READY   STATUS    RESTARTS   AGE   IP           NODE                NOMINATED NODE   READINESS GATES
- nginx-pod2   1/1     Running   0          20m   10.244.1.2   local-cluster-m02   <none>           <none>

- Yaml format:
    - `kubectl get pods nginx-pod2 -o yaml`

- For more detailed information:
    - `kubectl describe pod nginx-pod2`

**Getting into pod:**
- `kubectl exec -it <pod-name> --bash`
    - '-it' means interactive terminal.

- when there is multiple containers in a pod, we can specify which container should we go into.
    - `kubectl exec -it <pod-name> -c <container-name> --bash`

**port forwarding:**
- we can't access the pod outside the node, we can only access it inside the node.
- so port forward is used to access the pod outside the node.

- `kubectl port-forward <pod-name> <local-port>:<container-port>`

**Logs:**
- `kubectl logs <pod-name>`

**Deleting the pod:**
- `kubectl delete -f <file-name>`

### ReplicaSets:
Features:
    - Self Healing
    - High availability
    - Rollout and Rollback

- ReplicaSets:
- If a pod goes down, then a new pod with the same characteristics should replace it. It is known as replicas.
- so, replicaset is used for this.

- If the node goes down, the replicaset will create all the pods on the next working node.

- syntax:
    ```yaml
    apiVersion: apps/v1
    kind: ReplicaSet
    metadata:
        name: nginx-replicaset
    spec:
    replicas: 3
    selector:
        matchLabels:
        app: nginxapp
    template:
        # this is same as the pod specification
        metadata:
        name: nginx-pod
        labels:
            app: nginxapp
        spec:
        containers:
            - name: nginx-container
            image: nginx:latest
            ports:
                - containerPort: 80
    ```

- Explanation:
    - We can get replicaset apiVersion and kind from `kubectl api-resources`
    - In metadata, just give a name for the replicaSet
    - In spec, there should be replica, selector to matchlabels with the pod labels.
    - In template, this is pod yaml file from metadata.

- A replicaSet automatically creates pod and a deployment automatically creates a replicaSet

### Deployments

- Features:
    - Rollout and Rollback

- A deployment automatically creates a replicaSet and rs creates a pod.

**Scaling:**
1. Just change the replicas in the deployment file and apply it.
2. Otherwise, use `kubectl scale --replicas=4 <deployment-name>`

**Rollout:**
1. Just change the image tag in deployment file and apply it.
2. Any change in the template section of the deployment file creates a new replicaset.
3. But the old replicaset is not deleted because during rollback, the same replicaset is used.
4. By default, kubernetes stores the last 10 replicas.

- changing the image tag directly : `kubectl set image <deployment-name> <container-name>=<image>:<tag>`

**Rollout history:**
- `kubectl rollout history <deployment-name>`

**Change-cause:**
- use `--record` flag during rollout to store the change cause.

- Use annotations on deployment file.
    ```yaml
        annotations:
    kubernetes.io/change-cause: "Replica increased to 3 and nginx to latest version."
    ```

**Rollback:**
- `kubectl rollout undo <deployment-name> --to-revision=<revision-no>`
- Refer: nginx-deployment,portfolio-deploy.yaml

### Services:

- Each pod has its own Private IP. so within a cluster, a pod can access another using pod ip but when a pod deleted or restarted, it ip changes. so it is not usable. so we need services.

- when a service is created, a ip address is created to the services, users can call the service ip and service forwards the request to the pods.

- Service takes care of load balancing.
```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  ports: #mandatory
    - port: 8080 # on which service will receive request
      targetPort: 80 # port no of the container in the pod
      
```
**Types:**
1. clusterIP:
    - This type of service exposes only to the internal of the cluster and can't be accessed outside.
    - This is default and can be specified in spec by `type: ClusterIP`
    - use labels with selector in spec for specifiying the pod.
    - we can access it by going into a pod and using the service ip or the name of the service.
    - ```yaml
        apiVersion: v1
        kind: Service
        metadata:
        name: nginx-service
        spec:
        selector:
            app: nginxapp
        ports: #mandatory
            - port: 8080 # on which service will receive request
            targetPort: 80 # port no of the container in the pod
    ```

2. Multi Port services:
    - If we have multiple containers in a pod and each container exposes the services, then we can give ports as a list with a name.
    ```yaml
    ports: #mandatory
    - name: proxy
      port: 8080 # on which service will receive request
      targetPort: 80
    - name: frontend
      port: 3000
      targetPort: 3000
    ```
3. Node Port services:
    - It exposes the pod on each node with a static port.
    - we can access it outside the cluster using <nodeIP>:<nodeport>
    - From outside the cluster, when one requests, it will go to nodeport -> clusterIP (imagination) -> pod
    ```yaml
    apiVersion: v1
    kind: Service
    metadata:
    name: nginx-service
    spec:
    type: NodePort
    selector:
        app: nginxapp
    ports: #mandatory
        - port: 8080 # on which service will receive request
        targetPort: 80 # port no of the container in the pod
        nodePort: 30000
    ```
    - use type and nodeport
    - get node ip and access the it with the nodePort:
        - Node ip : `minikube ip -p local-cluster`
        - use ` -n flag and specify the node, default goes to control-plane`
    - use `minikube service <service-name> -p <cluster-name>`

4. Load Balancer:
    - Change the type to loadbalancer in config file
    - LoadBalancer is a type of Kubernetes service that exposes the service externally using a cloud provider’s load balancer.
    - When you create a LoadBalancer service, Kubernetes provisions an external load balancer from the cloud provider (e.g., AWS ELB, GCP Load Balancer, Azure Load Balancer).
    - The external load balancer routes traffic to the backend NodePort services on the nodes.
    - It provides a single external IP address that can be used to access the service from outside the cluster.
- Refer: nginx-service, portfolio-service.yaml
---
### Ingress:

**Definition:**
- In Kubernetes, an Ingress is a resource that allows you to expose HTTP and HTTPS routes from outside the cluster to services within the cluster. 
- It provides a way to manage external access to services in a Kubernetes cluster, typically HTTP and HTTPS, and can handle features like load balancing, SSL termination, and name-based virtual hosting.

**Key Concepts:**
1. Ingress Resource: A set of rules that define how to route external HTTP/HTTPS traffic to services within the cluster.
2. Ingress Controller:  A controller that watches the Ingress resources and updates the load balancer accordingly.

**Why:**
- Using nodeport, we can expose a pods port to external services and we can also use loadbalancer.
- But everytime, we use the load balancer service, the cloud providers will charge for the number of the load balancer. so we can use ingress and route to different service based on the requests.

**Ingress Rules:**
- Ingress has rules which defines which service should go based on the routes.

**Ingress Controller:**
- To process the ingress rules, we should have a ingress controller.
- There are many third party ingress controller,
    - HA-Proxy
    - traefik
    - Istio
- Default ingress controller is nginx ingress controller which is maintained by kubernetes itself.

**setup:**
- `minikube addons enable ingress -p <cluster-name>`
- Check using: `kubectl get po -A`
- O/p: 
    - ```bash
        ingress-nginx   ingress-nginx-admission-create-b5wnm        0/1     Completed   0               63s
        ingress-nginx   ingress-nginx-admission-patch-4xbfs         0/1     Completed   1               63s
        ingress-nginx   ingress-nginx-controller-768f948f8f-lx85c   1/1     Running     0               63s
    ```
**Ingress View - Hands ON**
refer:nginx-ingress.yaml

- Path type:
    - prefix:
        - Checks only that the prefix matches.
        - /app = /app/hello, /app, /app/ but not /apps
    - exact:
        - It should be exact match

- Backend:
    - here mention we the request should be forward to which service.
    - service to the request map.

- port:  It is the port number of service where the request is accepted.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx-ingress
spec:
  rules:
    - host: nginx-demo.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: nginx-service
                port:
                  number: 80      
```

- Go to /etc/hosts and add the node ip with the domain(nginx-demo.com) and check the website that it works.

**Path based Routing:**
```yaml
#this ingress is for path based routing between nginx-service and portfolio-service
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: common-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$1 
spec:
  rules:
    - host: common.com
      http:
        paths:
          - path: /nginx/(.*)
            pathType: Prefix
            backend:
              service:
                name: nginx-service
                port:
                  number: 80
          - path: /(.*)
            pathType: Prefix
            backend:
              service: 
                name: portfolio-service
                port:
                  number: 8080
```
- Add common.com to node ip in /etc/hosts
- annotations takes /nginx/nginx from the route and rewrites it to /nginx

**Host based Routing:**
```yaml
#this ingress is for path based routing between nginx-service and portfolio-service
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: host-ingress
spec:
  rules:
    - host: nginx-demo.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: nginx-service
                port:
                  number: 80
    - host: common.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service: 
                name: portfolio-service
                port:
                  number: 8080
```
- If the routes doesn't match any of the routes, then it goes to default-http-backend. If we create a service in that name, we can manage the unexpected path.

- To make the website the https secured, create your own root key and add it as a secret into the config files's spec.
---
### Namespace:

**Definition:**
- Namespaces in Kubernetes are a way to divide cluster resources between multiple users or teams. 
- They provide a mechanism to manage different environments within the same cluster, such as development, staging, and production.

- Namespace is a way to organization the resources of k8s objects.
- Each namespace is logically separated from others but can communicate with one another.

**Why:**
- Avoiding conflicts:
    - Suppose, we create a service named "nginx-service" and another person also creates a service with same name on the same cluster.
    - Then, our service will get overridden with their service.

- Restricting Access:
    - we can restrict access to a namespace, so that only certain individual could use it.

- Resource Limits:
    - we can run a app in a namespace and limit the resource it can use.

**Default Namespaces:**
1. Default:
    - Resources when we don't specify namespace explicitly.
2. Kube-node-lease:
    - contains lease resourcees to send heartbeats of node.
    - so when a node is down, it can recreate another one.
3. Kube-public:
    - used for public resources.
    - It is read only
4. Kube-system:
    - For objects created by kubernetes/

**Syntax:**
- Creation:
    - `kubectl create namespace nginx`

- ls namespaces:
    - `kubectl get namespaces`

- config file:
    ```yaml
    apiVersion: v1
    kind: Namespace
    metadata:
        name: nginx
    ```

- Deletion:
    - `kubectl delete ns nginx`

- usage:
    - In the deployment or pod config file, in the metadata use `namespace: <ns-name>`

- Namespace changing:
    - `kubectl config set-context --current --namespace=<ns-name>`

**Communication between namespace:**
- Go into a pod in different ns and try to communication a pod in another ns.
    - curl todo-api-service:8080/api/todos
    - this won't work
    - use `curl todo-api-service.<nsname>:8080/api/todos`

### Volumes:

**Types of volumes:**
***Persistent Volumes:***
- setup:
    - Create a deployment with mongo image - refer - mongo-deploy.yaml
    - create a service for the deployment
    - go to mongo compass, and connect with nodeip:nodeport with username and password

- By default, the data is stored at the container level.

1. emptyDir: refer: mongo-deploy.yaml
    - It is a pod level volume. It is created when a pod is first created. 
    - Containers in a same pod can share the pod.

    - Creation:
    - ```yaml
        # Inside spec,
        spec:
            volumes:
                - name: mongo-volume
                  emptyDir: {}
        ```
    
    - Usage:
    - ```yaml
        # In containers, for a list.
        spec:
            containers:
                - image: ...
                  volumeMounts:
                    - mountPath: /data/db
                      name: mongo-volume
       ```

    - If the data is stored on the pod level, other applications can't share the data and when the pod is destroyed, data is lost.

2. hostPath: mongo-deploy-hostpath.yaml
    - Hostpath is a node level volume. If a pod is deleted, the data is persisted.
    - The pods inside a node can be share the data in the volume but the pods in another node can't access the data.
    - If the node is deleted, the data are lost.

- These above two volumes are ephemeral.

***Persistent Volumes:***
1. Persistent Volumes
2. Persistent Volume Claims
3. Storage Classes


1. Persistent Volume: refer: pv.yaml
    - It is a piece of storage in the cluster that has been provisioned by an administrator or dynamically provisioned using storage classes.
    - It is a kubernetes resource like any other (pods,deployment)
    
    - output:
        - ```yaml
        NAME       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS   VOLUMEATTRIBUTESCLASS   REASON   AGE
        mongo-pv   5Gi        RWX            Retain           Available                          <unset>                          15s
        ```
    - Here status=available means it is still not bound.

2. Persistent Volume Claim (PVC): refer pvc.yaml

    - We can't directly use persistent volume in deploy, we should use persistent volume claim(pvc) and associate pvc with deployment.

    - When we give accessModes and storage required for a pod in pvc, it refers the all the pv and select the suitable one.

    - When a pvc is created, it automatically attached with pv.

    - Output: 
        ```yaml
        ❯ kubectl get pvc
        NAME        STATUS   VOLUME     CAPACITY   ACCESS MODES   STORAGECLASS   VOLUMEATTRIBUTESCLASS   AGE
        mongo-pvc   Bound    mongo-pv   5Gi        RWX                           <unset>                 19s

        ~ 
        ❯ kubectl get pv
        NAME       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM               STORAGECLASS   VOLUMEATTRIBUTESCLASS   REASON   AGE
        mongo-pv   5Gi        RWX            Retain           Bound    default/mongo-pvc                  <unset>                          10m
        ```

    - The status of the pv goes to bound because it is used by pvc.

    - Usage: refer: mongo-deploy-pvc.yaml
        - ```yaml
            spec:
                volumes:
                - name: mongo-vol
                persistentVolumeClaim:
                    claimName: mongo-pvc
            ```
    - Creation of pvc and bounding it to pv doesn't work. Because, I think there is a problem with the pv config.

3. Storage Class:
    - Storage class is a kubernetes resources which we can use in pvc to dynamically create pv.
    - It works:
        - Syntax:
            ```yaml
            #storage class
            apiVersion: storage.k8s.io/v1
            kind: StorageClass
            metadata:
            name: demo-storage
            provisioner: k8s.io/minikube-hohttps://github.com/pelthepu/Kubernetes.gitstpath
            volumeBindingMode: Immediate
            reclaimPolicy: Delete
            ```
        - usage in volumeclaim
            ```yaml
            apiVersion: v1
            kind: PersistentVolumeClaim
            metadata:
            name: mongo-pvc-sc
            spec:
            accessModes:
                - ReadWriteMany
            resources:
                requests:
                storage: 5Gi
            storageClassName: "demo-storage"
            ```

### Statefulsets:
    - refer: /statefulsets/statefulset.yaml
    - refer: /volumes/sc.yaml

    - Only difference from normal deployment with storage class is using volumeclaimtemplate.

    - one by one pod will be created.

    - For each pod, a separate pvc is created and even if the pod is destroyed, the pvc is not deleted.

    - Replicas is not directly created for the statefulsets, we have to initialize a replica inside the pod:(note this is not replicaset)
        - ```json
        rs.initiate(
            {
                _id: "myReplSet",
                version: 1,
                members:[
                    {_id: 0, host: "mongodb0.example.net:27017},
                     {_id: 1, host: "mongodb1.example.net:27017},
                      {_id: 2, host: "mongodb2.example.net:27017}
                ]
            }
        )
        ```

    - TO check `rs.status()` and primary(master pod) and secondary(worker pod) is set up automatically.
    - rs.slaveOk:: - in the slave mongo pod to replicate the data from the master pod.
    - We have to run a headless service for above replication operation. refer: /statefulsets/headless-service.yaml

---
### ConfigMaps:
    - Whenever we develop any application, we should not hardcode properties which may change for each environment.
    - we will use .env for this.

**3 Ways to configure data:**
- Passing Arguments
- Configuration Files
- Environment Variables

- We shouldn't directly use values as env in pod definition.
- Kubernetes provides two resources for this:   
    - ConfigMap
    - Secret

**Definition:**
- Configmap is a kubernetes object that lets us to store configuration which can be used in different applications.
- Refer: /configMaps/mongo-configmap.yaml, /configMaps/mongo-secret.yaml, /statefulsets/statefulset.yaml

- Syntax: 
    - ```yaml
    apiVersion: v1
    kind: ConfigMap
    metadata: 
    name: mongodb-config
    immutable: false
    data:
    username: admin1
    mongodb.conf: |
        storage:
        dbPath: /data/db
        replication:
            replSetName: "rs0"
    ```
    - unlike other resources, here apiVersion,kind,metadata and data.
    - Data is key value pair and we can also define file like mongodb.conf

- usage:
    - Normal data:
        - ```yaml
            env:
                - name: MONGO_INITDB_ROOT_USERNAME
                valueFrom:
                    configMapKeyRef:
                    key: username
                    name: mongodb-config
        ```
    - file:
        - use volume:
        - ```yaml
            volumes:
            - name: mongodb-config
              configMap:
                name: mongodb-config
                items:
                - key: mongodb.conf
                  path: mongodb.conf #this is name with which the file is created
        ```
        - If we don't give keys, then everything inside configmap goes as files.
        - Then mount the volumes:
            - ```yaml
                volumeMounts:
                    - name: mongo-volume
                    mountPath: /data/db
                    - name: mongodb-config
                    mountPath: /etc/mongo
            ```
---
### Secret:
**Definition:**
- Secret and configmaps creation and usage is same but secret are secure and can be encoded.
- To encode `echo -n password | base64`
- To decode `echo -n encoded_string | base64 --decode`
- we can also go into pod, and type env to check the secret details.
- Kind is secret.
- Syntax:
    - ```yaml
            apiVersion: v1
            kind: Secret
            metadata: 
            name: mongodb-secret
            immutable: false
            type: Opaque
            data:
            password: cGFzc3dvcmQxMjM=
    ```
- Types:
    - Opaque = for arbitary user-defined data
    - ```markdown
        - Opaque                              = arbitrary user-defined data
        - kubernetes.io/service-account-token = ServiceAccount token
        - kubernetes.io/dockercfg             = serialized ~/.dockercfg file
        - kubernetes.io/dockerconfigjson      = serialized ~/.docker/config.json file
        - kubernetes.io/basic-auth            = credentials for basic authentication
        - kubernetes.io/ssh-auth              = credentials for SSH authentication
        - kubernetes.io/tls                   = data for a TLS client or server
        - bootstrap.kubernetes.io/token       = bootstrap token data
    ```

- Usage:
    - ```yaml
        env:
            - name: MONGO_INITDB_ROOT_PASSWORD
              valueFrom:
                secretKeyRef:
                  key: password
                  name: mongodb-secret
    ```
    - Instead of configMapKey ref use secretKeyRef

---
### Probe:

- Causes for the failure of the pod:
    1. Bugs
    2. Timeouts while communicating with external service
    3. DB connection failure
    4. OutOfMemory Issues
    5. Etc..
    - From outside, the pod may look like, it is running but due to internal errors, the functionalities are broken.

    - A probe is complete checkup in general.
    - In kubernetes, Investigates the pods if they're working correctly or not.

    - Types:
        1. Liveness
        2. Readiness
        3. Startup
1. Liveness Probe:
    - we can check whether the pod is alive or not using commands.

    - ```yaml
        livenessProbe:
            exec:
                command:
                    - mongo
                    - --eval
                    - "db.adminCommand('ping')"
    ```
    - 0 = success, 1 = failure

    - Probing Mechanisms:
        - Exec:
        - Http:
            - ```yaml
                httpGet:
                    path:/health
                    port: 8080
            ```
            - 200-399 = success or failure
        - TCP:
            - ```
                tcpSocket:
                    port:8080
            ```
            - success if port accepts traffic or failure.
    
    - Probing customization:
        - Type|purpose|DefaultValue
        - initialDelaySeconds|Delay to run the probe initially|0s
        - periodSeconds|How frequently probe should execute after initial delay|10s
        - timeoutSeconds|Timeout Period to mark as failure|1s
        - failure/successThreshold|How many times to retry in case of failure|3times
    
2. ReadinessProbe:
- It identifies when the container can handle the external service.
- when readiness probe fails, then k8s removes the ip address of the probe from the endpoint of all services it belongs to.
- Refer: statefulset.yaml
- Same syntax as livenessprobe.

3. Startup probe:
    - It provides a way to delay liveness and readiness probe meaning only if the startup probe is successful, the liveness and readiness prob is checked.
    - same syntax as liveness probe refer: statefulsets.yaml

**Best practices:**
- Ideal frequency
- Lightweight
- Correct Restart Policy
- use only when needed
- keep an eye on probes regularly

---
### Resource Management:
1. Requesting CPU and memory
2. Limiting CPU and Memory
3. Quality of Service
4. Setting min, max and default resources for pods in a namespace - LimitRange
5. Limiting resources in a namespace-
ResourceQuota

**Computing Resources:**
1.CPU:
    - Measured a fraction of time.
    - Ex: 200m(0.2CPU), 1CPU(1000m)
    - Compressible = if full, can be throttled
    - Throttles
    - 1 cpu is equal to:
        - 1 vCPU in AWS
        - 1 core in gcp
        - 1 vCore in Azure
        - 1 Hyperthread on bare-metal

2. Memory:
    - Measured in Bytes
    - Not compressible = once allocated, should wait for the process to release the resources.
    - Terminates

**Requests:**
- Minimum
- It is a way for the pod to request resources for itself, the k8s check the resources available on node and allocate the pod which satisfies it's request.
- ```yaml
    containers:
        resources:
            requests:
                memory: "200Mi"
                cpu: "1"
    ```
- If the resources not available, if not available, the pod creation is in pending state.

**Limits:**
- Maximum
- Limits limits the resources used by the pod
- syntax:
    - ```yaml
        resources:
            limits:
                memory: "2Gi"
                cpu: "1"
        ```

- Refer: /resourceManagement/resources-demo-pod.yaml

- If the pod uses more cpu than the limit, then the cpu rate is throttled but when the memory usage is high than the limit, then pod is restarted.

**Memory Management:**
- Kubernetes looks at the resources while allocation not the limits and allocates the pod based on the unallocated resources not actual usage.
- Hence if the pod usage memory more than the node, then the pod should be killed. Here comes, the Quality of Service classes.

**Quality of service:**
- Kubernetes determines which pods to be killed based on three classes:
1. BestEffort:
    - When we don't define both request and limits, then the pod is defined as besteffort.
    - Priority is low.
2. Guaranteed:
    - when requests and limits are equal.
    - priority is high.
3. Burstable:
    - when the requests and limits doesn't match.
    - priority is middle.
- Killed order:
    - BestEffort -> Burstable -> Guaranteed

**Limit Range:**
- It is a resources which check whether the other resources like pod, container, volumes within this limitrange.
- It restricts at pod, container level

- some times, we need to restrict at namespace level, that's where resourcequota comes into the picture

**Resource Quota:**
- It restricts at namespace level.
- Refer: resource-quota-demo.yaml

---
### Advanced Scheduling:
- refer: todo-ui-deploy.yaml

1. nodeName:
    - We can directly give name of the pods
    - ```yaml
        spec:
        nodeName: local-cluster-m04
        containers:
            - name: todo-ui
            image: pavanelthepu/todo-ui:1.0.2
            ports:
                - containerPort: 80 
        ```
    - refer: todo-ui-deploy.yaml

2. nodeSelector:
    - we can give labels to node and using nodeselector in config, we can allocate nodes.
    - To add labels to node:
        - `kubectl label node <node-name> key=value`
    - To get labels for a node:
        - `kubectl get nodes --show-labels`
        - `kubectl get nodes -l team=devops`
    - usage:
    - ```yaml
        spec: 
            nodeSelector:
                team: devops
        ```
3. Affinity:
- Affinity is a alternative to node selector and can be used to handle complex situations.
    - There are two types of affinity:
        - nodeAffinity
        - podAffinity
    
    1. NodeAffinity: todo-ui-deploy.yaml
        - requiredDuringSchedulingIgnoredDuringExecution:
            - requiredDuringScheduling means that the node should have that label during the scheduling but IgnoredDuringExecution means if the already running pods doesn't have the labels then they are not deleted.
        
        - preferredDuringSchedulingIgnoredDuringExecution:
            - Here during scheduling, it checks for the node with required label but if not available, it allocates any node.
            - we should definitely have a weight and preference.

        - usage:
            - ```yaml
                requiredDuringSchedulingIgnoredDuringExecution:
                nodeSelectorTerms:
                - matchExpressions:
                    - key: "rank"
                        operator: Lt
                        values:
                        - "0"
                ```
        - usage:
            - ```yaml
                preferredDuringSchedulingIgnoredDuringExecution:
                    - weight: 40
                    preference:
                        matchExpressions:
                        - key: "team"
                        operator: In
                        values: ["analytics"]
                    - weight: 60
                    preference:
                        matchExpressions:
                        - key: "rank"
                        operator: Gt
                        values: ["4"]
                ```
    
    2. Pod Affinity: refer: todo-api-deploy.yaml
        - Pod affinity is used to co-relate two pods
        - syntax:
            - ```yaml
                spec:
                    affinity:
                        podAffinity:
                        requiredDuringSchedulingIgnoredDuringExecution:
                            - labelSelector:
                                matchExpressions:
                                - key: "app"
                                    operator: In
                                    values:
                                    - "mongodb"
                            topologyKey: kubernetes.io/hostname
                ```
            - Here, the matchexpressions checks for the pod with label app=mongodb and gets the matched pod's 
            topologykey (i.e., node) and assigns this pod to that pod's node.
    
    3. PodAntiAffinity:
        - pod anti affinity never allocates two pod in same node when they are related.
        - syntax:
            - ```yaml
                podAntiAffinity:
                requiredDuringSchedulingIgnoredDuringExecution:
                    - labelSelector:
                        matchExpressions:
                        - key: "app"
                            operator: In
                            values:
                            - "mongodb"
                    topologyKey: kubernetes.io/hostname
                ```
            - Here, the pod with the label are identified and this pod is never allocated to the node of the matched pod.

**Taints and tolerations:**
- Taints and tolerations is a another way to allocate pod and nodes.
- Taints is applied to the node and tolerations is applied in pod level config.
- Types:
    - NoSchedule - Hard (Do not schedule pods if they can't tolerate)
    - PreferNoSchedule - Soft (can be scheduled if no other nodes available)
    - NoExecute - Strict (Delete running pods also if they can't tolerate newly added taint)

- Syntax - `kubectl taint node <nodename> key=value:taintType`

- Tolerations: refer: todo-ui-deploy.yaml
    - Tolerations are applied at the pod config level.
    - ```yaml
        tolerations:
        - key: "env"
          operator: Equal 
          value: "prod"
          effect: NoSchedule
        ```
---
### Auto-Scaling:

**Horizontal Pod Autoscaler - HPA:**
- refer: ./kubernetes/autoscaling/...
- It is used to increase or decrease (scale) the number of pods based on a particular metric.
- Deploy a stress-api of pavan elthepu
- create a service for it
- create a hpa for it,
    - ```yaml
                #hpa = horizontal pod autoscaling
        apiVersion: autoscaling/v2
        kind: HorizontalPodAutoscaler
        metadata:
        name: utility-api
        spec:
        minReplicas: 1
        maxReplicas: 5
        metrics:
            - resource:
                name: cpu
                target:
                averageUtilization: 70
                type: Utilization
            type: Resource
        scaleTargetRef:
            apiVersion: apps/v1
            kind: Deployment
            name: utility-api
        ```
- create a traffic generator for load testing refer:traffic-generator.yaml

- Go into traffic-generator pod

- use wrk tool to generate requests to utility-api:
    - Install wrk: `apk add wrk`
    - cmd: `wrk -c 5 -t 5 -d 300s -H "Connection: Close" http://utility-api-service:8080/api/stress`

- Check the whether hpa works or not:

**Vertical Pod Autoscaler:**
- refer:autoscaling/vpa.yaml
- VPA increases the resources(spec) of the pod based on the load.
- vpa is not directly available in kubectl resources and we have to clone a repo and install some files in it:
    - `git clone https://github.com/kubernetes/autoscaler.git`
    - go into that. and run `./vertical-pod-autoscaler/hack/vpa-up.sh/`
    - apply the vpa and describe the vpa to see lower bound(req) and upper bound(limit).

- More resources and not being used -> cost increase
- Less resources and fully used -> performance Issues
- syntax:
    - ```yaml
        apiVersion: autoscaling.k8s.io/v1
        kind: VerticalPodAutoscaler
        metadata:
        name: utility-api
        spec:
        targetRef:
            apiVersion: apps/v1
            kind: Deployment
            name: utility-api
        updatePolicy:
            updateMode: "Off"
    ```
- updateMode can be "Off","Auto","Initial".
    - Auto will automatically increases the spec of the pod.
    - off will give only recommendation
    - Initial will only increase the newly created pod.

**Cluster AutoScaler:**
- when we don't have enough resources to run the pods in the node. then we have to increase the node. It can be done automatically.
- It doesn't look at memory or cpu available, it only see the pending pod without resources and creates a new node.
- If the utilization goes below 50%, the node is deleted.
- It can't be done using minikube.
- Cloud:
    - Aws -> EC2 Instance
    - Azure -> Virtual Machine
    - GCP -> Compute Engine
---

### RBAC:
**Definition:**
- RBAC stands for Role Based Access Control
- In realtime, there are lot of kubernetes resources managed for an application. when there is no restriction, there may be a problem with access and restrictions.
- So, we should implement role based

**Creating user:**
- We can't create create a user directly and authentication and authorization is handled by the api-server(k8s).

- In local, the information related to the cluster is stored in ~/.kube/config file.

- Any user should have a certificate signed by the certificate authority.

- First, we should generate a user's private key with ssl:
    - `openssl genrsa -out pavan.key 2048`
- Now, generate the certificate signing request for the user with above key:
    - `openssl req -new -key pavan.key -out pavan.csr -subj "/CN=pavan/0=dev/O=example.org"`
    - CN = Common name, /O= user group and we can give multiple user group for a single user.

- Now, this certificate signing req(csr) should be signed by the certificate authority.
    - `sudo openssl x509 -CA ~/.minikube/ca.crt -CAkey ~/.minikube/ca.key -CAcreateserial -days 730 -i pavan.csr -out pavan.crt`

- Now, we should add the user to the cluster:
    - `kubectl config set-credentials pavan --client-certificate=pavan.crt --client-key=pavan.key`

- Now, we should set the user:
    - `kubectl config set-context <context-name> --cluster=<cluster-name> --user=pavan --namespace=default`

- Now, user is created.

**Role and Role-binding:**
- In kubernetes, we can give permission by using role and role-binding.
- Role: refer: ./rbac/role.yaml
    - ```yaml
        apiVersion: rbac.authorization.k8s.io/v1
        kind: Role
        metadata:
        name: pod-reader
        rules:
        - apiGroups: [""] # "" indicates the core API group
        verbs: ["get", "watch", "list"]
        resources: ["pods", "pods/log"]
        # resourceNames: ["nginx"]
        ```
    - apiGroups identifies which api group to target, this is necessary because multiple api groups can have same resources.
    - "verbs" indicates the actions which can be done on the "resources"
        - to see verbs `kubectl api-resources -o wide | grep pod`

- Role binding: refer: role-binding.yaml
    - In role binding, we connect a subject (user,usergroup, service account) with a role and it comes a rolebinding.
    - ```yaml
            apiVersion: rbac.authorization.k8s.io/v1
            # This role binding allows user "pavan" to read pods in the "default" namespace.
            # You need to already have a Role named "pod-reader" in that namespace.
            kind: RoleBinding
            metadata:
            name: read-pods
            subjects:
            # You can specify more than one "subject"
            - kind: User
            name: pavan # "name" is case sensitive
            apiGroup: rbac.authorization.k8s.io
            - kind: ServiceAccount
            name: test-sa
            roleRef:
            # "roleRef" specifies the binding to a Role / ClusterRole
            kind: Role #this must be Role or ClusterRole
            name: pod-reader # this must match the name of the Role or ClusterRole you wish to bind to
            apiGroup: rbac.authorization.k8s.io
            # roleRef:
            #   kind: ClusterRole
            #   name: secret-reader
            #   apiGroup: rbac.authorization.k8s.io
        ```
- Role and role binding are namespaced meaning that the user will have access to the namespace where the role binding is defined.
**Cluster Role and Cluster Role-Binding:**
- It is at the cluster level.
- It is same as role and role-binding.
- refer: ./rbac/cluster-role.yaml && ./rbac/cluster-role-binding.yaml

**Group:**
- while created a user, we can give /0=usergroup.
- using this in kind of subjects, we can give "Group"

**Service Account:**
- we gave access to the users for accessing the resources but what if the some projects have to access the accounts, we can't give the user details due to security revisions.
- That's where, service accounts come into picture.
- While creating the namespace, a default service account is created.

- Getting the service account:
    - `kubectl get sa`
- Creating sa:
    - `kubectl create sa test-sa`
- we have to create a new service account
- use it in pod: 
    - ```yaml
        apiVersion: v1
        kind: Pod
        metadata:
        name: kubectl-pod
        spec:
        serviceAccount: test-sa
        containers:
        - name: kubectl
            image: bitnami/kubectl
            command: ["sleep", "20000"]
        ```
- then give it in role-binding.

- `kubectl auth can-i create pods` - to check whether we can create pods.
- `kubectl auth can-i creates pods --as="system:serviceaccount:default:test-sa"` - to check if the sa have permissions.
---
### Daemon Sets:
- refer:./daemonset/daemonset.yaml
- syntax:
    - ```yaml
        apiVersion: apps/v1
        kind: DaemonSet
        metadata:
        name: node-exporter
        spec:
        selector:
            matchLabels:
            app: node-exporter
        template:
            metadata:
            labels:
                app: node-exporter
            spec:
            # nodeSelector:
            #   kubernetes.io/os: linux
            containers:
            - name: node-exporter
                image: prom/node-exporter:latest
                args:
                - --path.procfs=/host/proc
                - --path.sysfs=/host/sys
                ports:
                - name: metrics
                containerPort: 9100
                volumeMounts:
                - name: procfs
                mountPath: /host/proc
                readOnly: true
                - name: sysfs
                mountPath: /host/sys
                readOnly: true
            volumes:
            - name: procfs
                hostPath:
                path: /proc
            - name: sysfs
                hostPath:
                path: /sys
        ```
        - procfs and sysfs are two virtual file system in linux that allows users and programs to interact with the kernel and access various system information in a convenient way

        - After applying this, whenever a new node is created, a new pod is automatically added to the node
        - kube-proxy is running on every node and it is used for network communication to pods and services running on it.
        - `kubectl delete ds <ds-name> --cascade=false` = this ensures that the pod which is running is not deleted. otherwise when a ds is deleted, the pod associated with it is also deleted.

**Jobs and CronJobs:**