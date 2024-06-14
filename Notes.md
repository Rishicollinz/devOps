### Curl ###

###### Date : 24/4/24

**General Commands:**

1. `curl <url>`
    - Returns data but doesn't follow the redirect.
    - It will show that the file is permentately moved.
2. `curl -L <url>`
    - Will follow the redirect and return data.
---
**Saving the output**
1. `curl -L <url> > filename`
2. `curl -o filename <url>`
3. `curl -X <http_methods>`
4. `curl -H 'headername:value' <url>`
5. `curl -d 'username=admin&password=1234' <url>`
---
**Downloading file**

```
curl -o <newfilename> <url>
```
- This lowercase o will replace the filename.

```
curl -O <url>
```
- This will download with existing name.

---
**Getting response header**

```
curl -I <url>
```
- This gives the response header
---
**Getting request header and connection details (TLS handshake)**

```
curl -v <url>
```

---
### Jenkins Pipeline

**Jenkins pipeline template**

```Pipeline template
pipeline {
    agent { 
        node {
            label 'jenkins-agent-goes-here'
            }
      }
    stages {
        stage('Build') {
            steps {
                echo "Building.."
                sh '''
                echo "doing build stuff.."
                '''
            }
        }
        stage('Test') {
            steps {
                echo "Testing.."
                sh '''
                echo "doing test stuff..
                '''
            }
        }
        stage('Deliver') {
            steps {
                echo 'Deliver....'
                sh '''
                echo "doing delivery stuff.."
                '''
            }
        }
    }
}
```
### Steps
- Create a new job with pipeline
- Enable poll scm in build triggers and use cron-syntax for scheduling it.
- on pipeline, use "pipeline with scm" and provide git repo url
- save to create a job.
- Now on repo, create a jenkinsfile and add pipeline to it.
- Now on every poll scheduled time, the jenkins job will check for the changes with git repository and if any, will start the build trigger.

### Jenkins bluestar:
- It is a nice way to view the various jobs.
- Download the plugin of bluestar.
- open job and click on view on bluestar.
- Explore blue star.

### Jenkins pipeline - Extended:
###### Date : 25/4/24
- Go to job, click on pipeline syntax
- choose git and give git repo url and generate the syntax.
- go to pipeline, and follow the below template.
```
pipeline{
    agent any
    stages{
        stage('Git Checkout'){
            steps{
                https://github.com/Rishicollinz/pyrun.git
                //add the generated syntax above
            }
        }
    }
}
```
### Pipeline concepts:
**Pipeline:**
- A pipeline is a user-defined model of a cd pipeline.
- A pipeline's code defines your entire build process, which typically includes stages for building an application, testing it and delivering it.

**Node:**
- A node is a machine which is a part of the jenkins environment and is capable of executing a pipeline.

**Stage:**
- A stage block defines a conceptually distinct subset of tasks performed through the entire Pipeline (e.g. "Build", "Test" and "Deploy" stages), which is used by many plugins to visualize or present Jenkins Pipeline status/progress.

**Step:**
- A single task.
- A step tells jenkins what to do at a particular point in time.

## Pipeline syntax overview:
There are two types of pipeline:
- Declarative pipeline:
    - Here, the overall block is pipeline.
```
pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
    }
    stages {
        stage('Build') {
            steps {
                sh 'make'
            }
        }
        stage('Test'){
            steps {
                sh 'make check'
                junit 'reports/**/*.xml'
            }
        }
        stage('Deploy') {
            steps {
                sh 'make publish'
            }
        }
    }
}
```

- Scripted pipeline:
    - The overall block is node and it runs on any available node.
```
node {
    stage('Build') {
        //
    }
    stage('Test') {
        //
    }
    stage('Deploy') {
        //
    }
}
```
#### Directive Generator:
**url:**${YOUR_JENKINS_URL}/directive-generator.

#### How to connect jenkin job with private repo:
- Generate access token on github
- create a global cred in jenkins as username(github acc) and password(Access token)
- Use this inside the job.


---
**Things to do:**
- jenkins pipeline 
- jenkins healthcheck
- jenkins using docker
- kubernetes concepts
- revise all devops
- scope of data engineer

---
### Twelve Factor App:

1. Codebase
2. Dependencies
3. Config
4. Backing Services
5. Build, Release, Run
6. Processes
7. Port Binding
8. Concurrency
9. Disposability
10. Dev/Prod Parity
11. Logs 
12. Admin processes

**Code Base:**
- Every developer should have a centralised vcs for the project.

**Dependencies:**
- We should have a requirements file with the versions of the needed dependent libraries. Ex: requirements.txt in a python project.

**Concurrency:**
- We must build our application as independent, stateless app. so that we can implement and deploy the app anywhere.

**Processes:**
- No sticky session.
- the session data should not be stored on local code and should be stored on backend process independently.

**Backing service:**
- S3, redis(caching service), smtp service, these are attach resources. The code shouldn't be changed for any specific service.

**Config:**
- Using .env file for the things which will be changed. 

**Build,Release,Run**
- Clear separation is required.

**Port Binding**

**Disposability:**
- Should shutdown the app gracefully and in seconds.
- Should use SIGTERM, SIGKILL

**DEV/PROD parity:**
- The gap between development and production should be very less.

**Logs:**
- fluentd is log managing system.
- store in centralised location with a structure like json.
- splunk

**Admin Processes:**
- Administrative process should be separate from the dev process and it should be one time.

---
### Time complexity:

- T(n) = 2n^2+3n+1
    - Drop lower order terms (i.e) - 3n and 1
    - Drop all the constant multipliers (i.e) - 2 in 2n^2.

    - T(n) = O(n^2)

**Rules**

1. Loop:
```c
for(i = 1; i<=n; i++){
    x=y+z;//constant time = c
}
//T(n)=cn
//Remove the c since it is constant.
// T(n)=O(n)
```

2. Nested Loop:
```c
for(i=1;i<=n;i++){// n times
    for(j=1;j<=n;j++){//n times
        x=y+z; //constant time
    }
    //T(n)=C*n*n
    //T(n)=O(n^2)
}
```

3. Sequential statements:
```c
a=a+b; //constant time c1
for(i=1;i<=n;i++){
    x=y+z; //c2n
}
for(i=1;i<=n;i++){
    c=d+e; //c3n
}
//T(n)=c1+c2n+c3n
//T(n)=O(n)
```

4. Conditional statements:
    - If there is if and else, then the 1 with the highest time complexity,should be taken.


5. Order:
    - O(1) < O(logn) < O(n) < O(nlogn) < O(n^c) < O(n!)


### Space Complexity:

**Amount of space:**
- The no of variables multiplied by no of bytes for its data type is the space complexity of the program.

### Big-O Notation:

1. O(1):
    - No matter how much the input size grows, the runtime is same. Most efficient.

2. O(n):
    - Linear time. The runtime increases the proportional to the input size.

3. O(n^2):
    - when we iterate through the array n times. then O(n^2)
    - when we have 2 nested for loop

4. O(m.n):
    - when the matrix isn't square and we have to iterate through each element.

5. O(logn):
    - Binary Search and Binary Search Tree
    - The no of times we divide the array by 2 and goes on till, it reaches 1.

6. O(nlogn):
    - Merge Sort
    - Two Operations, where one is n and another is logn

7. O(2^n):|| O(c^n)
    - Recursion is generally comes here.

8. O(sq.rt(n)):
    - for factors.

9. O(n!):
    - Travelling salesman problem.

---
### Load Balancer using nginx

**Solution:**

- A portfolio application is running on two vms named fresh and freshV22 as a docker container respectively.

- A host having nginx acts as a load balancer and using upstream reverse proxies to the 2 server.
```
http {
    upstream backend {
        server backend1.example.com;
        server backend2.example.com;
        server 192.0.0.1 backup;
    }

    server {
        location / {
            proxy_pass http://backend;
        }
    }
}

- Download jmeter.tgz file and extract it. GO to /bin and run ./jmeter
- Create a thread group and add http request and view results in table and run it.
- Monitor the progress using htop.
```

### Kubernetes:
- It is available on kubernetes folder

### Helm:
- It is available on helm folder

