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

