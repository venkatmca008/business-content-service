pipeline {
    agent { 
         kubernetes {
                cloud "openshift"
                label "business-content-service"
                
            }
    }
    parameters {
        string(name: 'GIT_REPO_REMOTE_URL', defaultValue: params.GIT_REPO_REMOTE_URL ?: 'https://github.com/venkatmca008/business-content-service.git', description: 'Business service git repository')
        string(name: 'REPOSITORY_BRANCH', defaultValue: params.REPOSITORY_BRANCH ?: 'master', description: 'git repository branch to use')
    }
    
    environment {
        JAVA_HOME = '/usr/bin/java'
        JAVA_PATH = '/usr/bin/java'
        JAVA_TOOL_OPTIONS = '-XX:+UnlockExperimentalVMOptions -Dsun.zip.disableMemoryMapping=true'
       
    }
    stages {
        stage('Checkout') {
            steps {
                sh 'ls'
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: "${REPOSITORY_BRANCH}"]],
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [
                        [$class: 'WipeWorkspace'],
                        [$class: 'CheckoutOption', timeout: 120],
                        [$class: 'CloneOption', depth: 0, noTags: true, reference: '', shallow: false, timeout: 120],
                        [$class: 'CleanBeforeCheckout']
                    ],
                    submoduleCfg: [],
                    userRemoteConfigs: [[
                        url: "${GIT_REPO_REMOTE_URL}"
                    ]]
                ])
            }
        }
        stage('Get Dependencies') {
            steps{
                sh '''
                    ls
                    rm .npmrc
                    env
                    npm -v
                    node -v
                    npm install
                    npm cache clean -f
                    pwd
                    npm test 
                     
                '''
               
            }
        }
    }
}