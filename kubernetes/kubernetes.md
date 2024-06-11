# KUBERNETES:

**Architecture:**

![Kubernetes Architecture](https://kubernetes.io/images/docs/kubernetes-cluster-architecture.svg)

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
### Ingress