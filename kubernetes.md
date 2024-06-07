# KUBERNETES:

**Architecture:**

![Kubernetes Architecture](https://kubernetes.io/images/docs/kubernetes-cluster-architecture.svg)

**Some Commands**
1. To use various context || To get all the available context:
    - `kubectl config get-contexts`

2. To switch between context:
    - `kubectl config use-context <contextName>`

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

