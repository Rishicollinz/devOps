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

