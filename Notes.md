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

**Things to do:**
- jenkins pipeline 
- jenkins healthcheck
- jenkins using docker
- kubernetes concepts
- revise all devops
- scope of data engineer